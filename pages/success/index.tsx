import Image from 'next/image';
import styles from './styles.module.scss';
import confirmedImg from '../../assets/confirmed.png';
export default function SuccessPage() {
  return (
    <div className={styles.Container}>
      <div className={styles.LootieArea}>
        <Image src={confirmedImg} alt='Agradecemos a ajuda de todos para melhorarmos nossa cidade.' width={300} />
        <p>Muito obrigado por participar dessa pesquisa. Vamos ouvir a opinião de todos para melhorarmos nossa cidade. Você já pode fechar essa pagina.</p>
      </div>
    </div>
  );
}