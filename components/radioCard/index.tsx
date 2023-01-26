import { ChangeEvent, useEffect, useState } from "react";
import { getSecondaryQuestions } from "../../pages/api/questions";
import { Question } from "../../pages/api/questions";
import styles from "./Styles.module.scss";

interface RadioCardProps {
  children?: React.ReactNode;
}

export default function RadioCard({ children }: RadioCardProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    getSecondaryQuestions().then(setQuestions);
  }, []);

  useEffect(() => {
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
      console.log(btn)
      btn.disabled = true;
    });

    // enable submit button
    const submitBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitBtn.disabled = false;
  }, [questions]);

  const handleRadioChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    const parent = ev.target.closest('[itemtype="radio-area"]') as HTMLElement;
    const nextParent = parent.nextElementSibling as HTMLElement;

    if (Number(value) == 2 || Number(value) == 3) {
      const btns = nextParent.querySelectorAll('button');
      btns.forEach((btn) => {
        btn.disabled = false;
      })
    } else {
      const btns = nextParent.querySelectorAll('button');
      btns.forEach((btn) => {
        btn.disabled = true;
      })
    }
  }

  const handleScoreBtn = (ev: any) => {
    // prevent the form from submitting
    ev.preventDefault();
    console.log(ev.target);
    // remove opacity of the section buttons but the clicked
    const btns = document.getElementsByName(`${ev.target.name}`);
    btns.forEach((btn) => {
      btn.style.opacity = '0.5';
    })
    ev.target.style.opacity = '1';

    // set the value of the next input to the value of the clicked button
    const input = document.getElementsByName(`${ev.target.name}-inpt`)[0] as HTMLInputElement;
    input.value = ev.target.value;
  }

  return (
    <>
      {
        questions.map((question) => {
          return (
            <div key={question.id} className={styles.Card} id={`${question.id}`} itemType='question-group'>
              <div className={styles.formGroup}>
                <label>{question.questao}</label>
                <div className={styles.RadioArea} itemType='radio-area'>
                  <div className={styles.RadioGroup}>
                    <input defaultChecked type="radio" name={`${question.id}-radio`} id={`${question.id}-radio-1`} value={1} onChange={handleRadioChange} />
                    <label htmlFor={`${question.id}-radio-1`}>Não sei avaliar</label>
                  </div>
                  <div className={styles.RadioGroup}>
                    <input type="radio" name={`${question.id}-radio`} id={`${question.id}-radio-2`} value={2} onChange={handleRadioChange} />
                    <label htmlFor={`${question.id}-radio-2`}>Conheço um pouco</label>
                  </div>
                  <div className={styles.RadioGroup}>
                    <input type="radio" name={`${question.id}-radio`} id={`${question.id}-radio-3`} value={3} onChange={handleRadioChange} />
                    <label htmlFor={`${question.id}-radio-3`}>Conheço bem</label>
                  </div>
                </div>
                <div className={styles.RangeScale}>
                  <button  type="button" style={{ backgroundColor: "#FF0000" }} onClick={handleScoreBtn} name={`${question.id}-btn`} value={1}>1</button>
                  <button  type="button" style={{ backgroundColor: "#FF2A00" }} onClick={handleScoreBtn} name={`${question.id}-btn`} value={2}>2</button>
                  <button  type="button" style={{ backgroundColor: "#FF5500" }} onClick={handleScoreBtn} name={`${question.id}-btn`} value={3}>3</button>
                  <button  type="button" style={{ backgroundColor: "#FF7F00" }} onClick={handleScoreBtn} name={`${question.id}-btn`} value={4}>4</button>
                  <button  type="button" style={{ backgroundColor: "#FFA500" }} onClick={handleScoreBtn} name={`${question.id}-btn`} value={5}>5</button>
                  <button  type="button" style={{ backgroundColor: "#FFBF00" }} onClick={handleScoreBtn} name={`${question.id}-btn`} value={6}>6</button>
                  <button  type="button" style={{ backgroundColor: "#FEDD00" }} onClick={handleScoreBtn} name={`${question.id}-btn`} value={7}>7</button>
                  <button  type="button" style={{ backgroundColor: "#FEBE00" }} onClick={handleScoreBtn} name={`${question.id}-btn`} value={8}>8</button>
                  <button  type="button" style={{ backgroundColor: "#00FF00" }} onClick={handleScoreBtn} name={`${question.id}-btn`} value={9}>9</button>
                  <button  type="button" style={{ backgroundColor: "#00FF2A" }} onClick={handleScoreBtn} name={`${question.id}-btn`} value={10}>10</button>
                </div>
                <input type="number" name={`${`${question.id}-btn-inpt`}`} />
              </div>
              <div className={styles.CardFooter}>
                <span>Muito Ruim</span>
                <span>Muito Bom</span>
              </div>
            </div>
          )
        })
      }
    </>
  )
}