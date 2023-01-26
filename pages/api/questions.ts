import cookie from "cookie"
import jsonwebtoken, { JwtPayload } from "jsonwebtoken"
export interface Question {
  id: number;
  questao: string;
  ativo: boolean;
}

export interface Bairro {
  tipo: number;
  id: number;
  nome: string;
}

function shuffle(array: any[]) {
  array.sort(() => Math.random() - 0.5);
}

export const getQuestions = (): Promise<Question[]> => {
  const token = cookie.parse(document.cookie).token;

  return new Promise(async (resolve) => {
    const allQuestion = await fetch("https://api.iqv-dev.com.br/questao", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    console.log(allQuestion);
    shuffle(allQuestion);
    resolve(allQuestion);
    return (allQuestion);
  });
};

export const getSecondaryQuestions = (): Promise<Question[]> => {
  const token = cookie.parse(document.cookie).token;

  return new Promise(async (resolve) => {
    const allQuestion = [
      {
        id: 1,
        questao: "Educação pública a cargo do município, que inclui escolas do ensino fundamental (até 5ª série) e creches",
        ativo: true,
      },
      {
        id: 2,
        questao: "Saúde municipal pública, que inclui, postos de saúde, UPA, UBS e hospitais",
        ativo: true,
      },
      {
        id: 3,
        questao: "Segurança pública a cargo da Guarda Municipal",
        ativo: true,
      },
      {
        id: 4,
        questao: "Urbanização, pavimentação viária, e iluminação pública incluindo urbanização de áreas e manutenção das vias",
        ativo: true,
      },
      {
        id: 5,
        questao: "Desenvolvimento social e atendimento à população carente incluindo CRAS, CREAS, CMTA",
        ativo: true,
      },
      {
        id: 6,
        questao: "Cultura, eventos e promoção do turismo no município",
        ativo: true,
      },
      {
        id: 7,
        questao: "Ações de promoção da Ciência, Tecnologia, Indústria e Comércio",
        ativo: true,
      },
      {
        id: 8,
        questao: "Controle e planejamento do trânsito",
        ativo: true,
      },
      {
        id: 9,
        questao: "Oferta e qualidade do transporte público (Ônibus Municipal)",
        ativo: true,
      },
      {
        id: 10,
        questao: "Espaços para meios de transporte não motorizados (bicicletas, pedestres e outros)",
        ativo: true,
      },
      {
        id: 11,
        questao: "Espaços para meios de transporte não motorizados (bicicletas, pedestres e outros)",
        ativo: true,
      },
      {
        id: 12,
        questao: "Promoção da agricultura",
        ativo: true,
      },
      {
        id: 13,
        questao: "Cuidados com o meio ambiente",
        ativo: true,
      },
    ]
    console.log(allQuestion);
    shuffle(allQuestion);
    resolve(allQuestion);
    return (allQuestion);
  });
};

export const postAnswers = (data: any) => {
  const token = cookie.parse(document.cookie).token;
  console.log(data)
  return new Promise(async (resolve) => {
    const response = await fetch("https://api.iqv-dev.com.br/resposta/many", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    resolve(response);
  });
};

export const getBairros = (): Promise<Bairro[]> => {
  const token = cookie.parse(document.cookie).token;

  return new Promise(async (resolve) => {
    const allBairros = await fetch("https://api.iqv-dev.com.br/bairro", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    console.log(allBairros);
    resolve(allBairros);
    return (allBairros);
  });
};

export const authenticateUser = (data: any): Promise<any> => {
  console.log(data)
  return new Promise(async (resolve) => {
    const response = await fetch("https://api.iqv-dev.com.br/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    resolve(response);
  });
};

export const getUserFromCookie = (): any => {
  const token = cookie.parse(document.cookie).token;
  const user = jsonwebtoken.decode(token) as any;
  return user;
}

export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}