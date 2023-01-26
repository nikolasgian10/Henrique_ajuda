import Image from 'next/image'
import Link from 'next/link'
import LogoQvin from '../../public/logo.png'
import LogoUnifei from '../../public/logo-unifei.png'
import LogoItajuba from '../../public/logo-itajuba.png'

import Styles from './Styles.module.scss'

export default function Navbar() {
  return (
    <nav className={Styles.Navbar}>
      <div>
        <Image src={LogoItajuba} className={Styles.Sm_img} alt="Itajubá - Minas Gerais" />
        <Image src={LogoUnifei} className={Styles.Sm_img} alt="UNIFEI - Universidade Federal de Itajubá" />
      </div>
    </nav>
  )
}