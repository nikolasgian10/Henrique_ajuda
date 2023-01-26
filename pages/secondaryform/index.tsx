import styles from './styles.module.scss';
import RadioCard from '../../components/radioCard';
import LogoIqv from '../../public/logo.png';
import Image from 'next/image';

export default function SecondaryForm() {

  const handleFormSubmit = (ev: any) => {
    ev.preventDefault();
    // get form by id
    const form = document.getElementById('secForm') as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // group radio, input and question id data by question id
    const groupedData = Object.entries(data).reduce((acc: any, [key, value]) => {
      const [id, type] = key.split('-');
      if (!acc[id]) {
        acc[id] = { id };
      }
      acc[id][type] = value;
      return acc;
    }
      , {});
    console.log(groupedData);
    window.location.href = "/success";
  }

  return (
    <div className={styles.Container}>
      <div className={styles.LogoArea}>
        <Image src={LogoIqv} alt="Indice de qualidade de vida" />
      </div>
      <p>Dê a sua nota de avaliação para os serviços públicos do município que você conhece.</p>

      <form id='secForm' className={styles.formContainer} >
        <RadioCard />
        <button onClick={handleFormSubmit} className={styles.Button} type="submit">Enviar Respostas</button>
      </form>
    </div>
  )
}