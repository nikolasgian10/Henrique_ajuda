import Image from 'next/image';
import styles from './styles.module.scss';
import confirmedImg from '../../assets/validate.png';
import { Bairro, getBairros } from '../api/questions';
import { useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';

export default function ValidacaoPage() {
  const [bairros, setBairros] = useState<Bairro[]>([]);
  const [all_bairros, setAllBairros] = useState<Bairro[]>([]);
  const [cookies, setCookie] = useCookies(['bairro']);


  useEffect(() => {
    getBairros().then((bairros) => {
      setBairros(bairros);
      setAllBairros(bairros);
      const bb = all_bairros.filter((b) => {
        console.log(b.tipo)
        return b.tipo == 1;
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bairro = e.currentTarget.bairro.value;
    setCookie('bairro', bairro, {
      path: '/',
      maxAge: 60 * 60, // Expires after 1hr
      sameSite: true,
    });
    console.log('submit');
    window.location.href = '/secondaryform';
  };

  const handleCheck = (ev: React.FormEvent<HTMLInputElement>) => {
    // check if its checked
    if (ev.currentTarget.checked) {
      const bb = all_bairros.filter((b) => {
        console.log(b.tipo)
        return b.tipo == 2;
      });
      setBairros(bb);
    }else {
      const bb = all_bairros.filter((b) => {
        console.log(b.tipo)
        return b.tipo == 1;
      });
      setBairros(bb);
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.LootieArea}>
        <Image src={confirmedImg} alt='Agradecemos a ajuda de todos para melhorarmos nossa cidade.' width={300} />
        <p>Nos informe em qual bairro você mora.</p>

        <form action="" onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
            <div className={styles.checkbox}>
            <input type="checkbox" name='rural' id='rural' onChange={handleCheck}/>
            <label htmlFor="rural">Moro na zona rual de Itajubá</label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bairro">Selecione seu bairro</label>
            <select name='bairro'>
              {
                bairros.length ?
                  bairros.map((bairro) => (
                    <option value={bairro.id} key={bairro.id}>{bairro.nome}</option>
                  ))
                  : <option value=''>Carregando...</option>
              }
            </select>
          </div>
          <button className={styles.Button}>Ir para pesquisa</button>
        </form>
      </div>
    </div>
  );
}