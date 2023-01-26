import Image from 'next/image'
import LogoUnifei from '../../public/logo-unifei.png'
import LogoItajuba from '../../public/logo-itajuba.png'

import styles from './styles.module.scss';

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <Image src={LogoItajuba} className={styles.Sm_img} alt="Itajubá - Minas Gerais" />
      <Image src={LogoUnifei} className={styles.Sm_img} alt="UNIFEI - Universidade Federal de Itajubá" />
    </div>
  )
}