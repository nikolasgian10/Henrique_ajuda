import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import streetImage from '../assets/street.png';
import { useRouter } from 'next/router';
import { authenticateUser } from './api/questions';
import { useCookies } from 'react-cookie';
import Footer from '../components/footer';
import LogoQvin from '../public/logo.png'
import Navbar from '../components/navbar';
import { IMaskInput } from "react-imask";

export default function Home() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['token']);

  const login = async () => {
    const { hash } = router.query;
    const cpf = document.getElementById('cpf') as HTMLInputElement;
    const cpfv = cpf.value;
    const nome = document.getElementById('nome') as HTMLInputElement;
    const nomev = nome.value;
    const email = document.getElementById('email') as HTMLInputElement;
    const emailv = email.value;
    console.log(nome, hash);
    let jsondados = emailv
    authenticateUser({ hash, jsondados }).then((res) => {
      return res.json();
    }).then((res) => {
      const token = res.access_token;
      if (token) {
        setCookie('token', token);
        router.push('/secondaryform');
      } else {
        setCookie('token', '');
        alert(res.message);
      }
    });


  }

  return (
    <>
    <Navbar />
      <div className={styles.Container}>
        <div className={styles.LootieArea}>
          <div className={styles.LogoArea}>
          <Image src={LogoQvin} width={300} alt='De a sua opinião de como gostaria que sua cidade investise em cada área' />
          </div>
          <h1>Seja bem vindo!</h1>
          <p>A prefeitura está preocupada em atender os desejos da população. Para tanto, diga-nos quanto recurso você considera que a prefeitura deve alocar em cada área de atuação.</p>

          <div className={styles.LootieFooter}>
            <div>
              <div className={styles.formGroup}>
                <label htmlFor="">Nome</label>
                <input type="text" name='nome' id='nome' />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="">CPF</label>
                <IMaskInput
                mask="000.000.000-00"
                name='cpf'
                id='cpf'
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="">Email</label>
                <input type="email" name='email' id='email' />
              </div>
              <button onClick={login} className={styles.Button}>Quero começar</button>
            </div>
          </div>
        </div>
      </div>
      </>
  );
}