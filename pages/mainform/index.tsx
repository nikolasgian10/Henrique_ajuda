import styles from './styles.module.scss';
import { authenticateUser, getQuestions, getUserFromCookie, postAnswers, Question } from '../api/questions'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from "next/router";

import LogoQvin from '../../public/logo.png';
import Image from 'next/image';
interface Resposta {
  pesquisa_id: number;
  cidadao_id: number;
  questao_id: number;
  resposta: number;
  nivel_conhecimento_id?: number | null;
  bairro_atualizado_id: number;
}

interface FormUser {
  cidadao_id: Number;
  pesquisa_id: Number;
  data_nascimento: string;
  hash: string;
}

export default function MainForm() {
  const [user, setUser] = useState<FormUser>()
  const [questions, setQuestions] = useState<Question[]>([]);
  const [points, setPoints] = useState(0);
  const [pointsColor, setPointsColor] = useState('rgba(0, 255, 0, 0.5)');
  const [displayedPoints, setDisplayedPoints] = useState(100);
  const [pointsExceeded, setPointsExceeded] = useState(false);
  const [pointsNotUsed, setPointsNotUsed] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(['bairro']);
  const router = useRouter();


  useEffect(() => {
  }, [points, displayedPoints]);

  useEffect(() => {
    getQuestions().then(setQuestions);
    const getUser = getUserFromCookie();
    if (getUser) {
      setUser(getUser);
    }
  }, []);

  const renderQuestions = (questions: Question[]) => {
    return questions.map((question) => {
      return (
        <div key={question.id} id={`${question.id}`} itemType='question-group'>
          <div className={styles.formGroup}>
            <label>{question.questao}</label>
            <div className={styles.PointsInputArea}>
              <button name={`${question.id}`} onClick={(ev) => { handleDecreasePoints(ev) }}>-</button>
              <input name={`${question.id}`} onChange={() => handleInputChanges()} type="number" defaultValue={0} disabled />
              <button name={`${question.id}`} onClick={(ev) => { handleIncreasePoints(ev) }}>+</button>
            </div>
            <input defaultValue={0} type="range" name={`${question.id}`} onChange={(ev) => handlePointsChange(ev)} />
            <div className={styles.RangeScale}>
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40</span>
              <span>50</span>
              <span>60</span>
              <span>70</span>
              <span>80</span>
              <span>90</span>
              <span>100</span>
            </div>
          </div>

        </div>
      )
    })
  }

  const handlePointsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputText = document.querySelector(`input[type=number][name="${inputName}"]`) as HTMLInputElement;
    inputText.value = event.target.value;
    handleInputChanges(inputText);
  }

  const handleInputChanges = (event?: HTMLInputElement) => {
    setPointsNotUsed(false);
    const allInputs = document.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;
    let totalPoints = 0;
    allInputs.forEach((input) => {

      totalPoints += Number(input.value);
    })
    if (totalPoints > 100 && event) {
      recaulculatePoints(event);
      setPointsExceeded(true);
    } else {
      setPointsExceeded(false);
    }
    if (totalPoints <= 100) {
      setPoints(totalPoints);
      setDisplayedPoints(100 - totalPoints);
    }

    setPointsColorScale();
  }

  const handleIncreasePoints = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const inputName = event.currentTarget.name;
    const inputText = document.querySelector(`input[type=number][name="${inputName}"]`) as HTMLInputElement;
    const inputRange = document.querySelector(`input[type=range][name="${inputName}"]`) as HTMLInputElement;
    const currentValue = Number(inputText.value);
    if (currentValue < 100) {
      inputText.value = String(currentValue + 1);
      inputRange.value = String(currentValue + 1);
      handleInputChanges(inputText);
    }
  }

  const handleDecreasePoints = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const inputName = event.currentTarget.name;
    const inputText = document.querySelector(`input[type=number][name="${inputName}"]`) as HTMLInputElement;
    const inputRange = document.querySelector(`input[type=range][name="${inputName}"]`) as HTMLInputElement;
    const currentValue = Number(inputText.value);
    if (currentValue > 0) {
      inputText.value = String(currentValue - 1);
      inputRange.value = String(currentValue - 1);
      handleInputChanges(inputText);
    }
  }

  const recaulculatePoints = (event: HTMLInputElement) => {
    const allInputs = document.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;
    let rangeInput = document.querySelector(`input[type=range][name="${event.name}"]`) as HTMLInputElement;


    let totalPoints = 0;
    allInputs.forEach((input) => {
      if (input.name !== event.name) {
        totalPoints += Number(input.value);
      }
    })
    event.value = String(100 - totalPoints);
    rangeInput.value = String(100 - totalPoints);
    setPoints(100);
    setDisplayedPoints(0)
  }

  const setPointsColorScale = () => {
    let r, g, b = 0;
    r = points * 2.55;
    g = 255 - (points * 2.55);
    b = 0;
    setPointsColor(`rgba(${r}, ${g}, ${b},  0.75)`);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user?.cidadao_id === undefined) {
      alert('Você precisa estar logado para responder a pesquisa')
      return;
    }
    const respostas: Resposta[] = [];

    if (points < 100) {
      setPointsNotUsed(true);
    } else {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      for (let key in data) {
        respostas.push({
          pesquisa_id: user.pesquisa_id as number,
          cidadao_id: user?.cidadao_id as number,
          questao_id: Number(key),
          resposta: Number(data[key]),
          bairro_atualizado_id: Number(cookies.bairro)
        })
      }

      const response = await postAnswers(respostas);
      console.log(response);
      if (response) {
        window.location.href = "/success";
      }
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.LogoArea}>
        <Image src={LogoQvin} width={300} alt='Qualidade de vida municipal' />
      </div>
      <p>Distribua os recursos da prefeitura entre as diversas áreas de prestação de serviços públicos. Destine mais recursos para as áreas que considera que devem ser prioridade da prefeitura. </p>
      <div className={styles.PointsHeader}>
        <div style={{ backgroundColor: pointsColor }} className={styles.Score}>
          <h2 className={styles.Points} >{displayedPoints}</h2>
        </div>
        {pointsExceeded && <p className={styles.PointsExceeded}>Você já usou todos os recursos.</p>}
        {pointsNotUsed && <p className={styles.PointsNotUsed}>Você precisa usar todos os pontos.</p>}
      </div>
      <form onSubmit={(ev) => handleSubmit(ev)} className={styles.formContainer}>
        {renderQuestions(questions)}
        <button className={styles.Button}>Enviar Respostas</button>
      </form>
    </div>
  )
}