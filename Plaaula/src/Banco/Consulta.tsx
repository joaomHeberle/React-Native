import Auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import BNCCLPJson from './BNCC banco/LP/1jc9q-f8otp.json';
import BNCCArteJson from './BNCC banco/ARTE/c16ls-vz0l5.json';
import BNCCCieJson from './BNCC banco/Cie/b56jy-85llc.json';
import BNCCERJson from './BNCC banco/E.R/wmdy8-s3n85.json';
import BNCCEFJson from './BNCC banco/ED.F/yqqg1-osp1l.json';
import BNCCGeoJson from './BNCC banco/GEO/xqvro-jdhe2.json';
import BNCCHisJson from './BNCC banco/his/oc1bi-e7uey.json';
import BNCCLIJson from './BNCC banco/Lin. Inglesa/wi4kz-hvz8h.json';

import BNCCMatJson from './BNCC banco/LP/1jc9q-f8otp.json';
import _ from "lodash";

const bnccCollection = firestore().collection('BNCC');
const atividadeCollection = firestore().collection('Usuario');


export async function lerBncc(disciplina:string,ano:string) {

    const atividades = await bnccCollection.doc(disciplina).get();
    const att=atividades._data.BNCC;
    const filteredList= _.filter(att,obj=>{
        return _.has(obj,"ANO/FAIXA") && _.includes(obj["ANO/FAIXA"], ano);
    })
    
  //console.log(filteredList)
return filteredList
  }

  export async function lerBnccInterno(disciplina:string,ano:string) {
    const nome = converteNomeParaOJson(disciplina)
    const filteredList= _.filter(nome,obj=>{
        return _.has(obj,"ANO/FAIXA") && _.includes(obj["ANO/FAIXA"], ano);
    })
    const componente = filteredList.map(componente=>{
        return (
          componente['OBJETOS DE CONHECIMENTO']
            )
    })
   // console.log(componente)
const noRepeat= _.uniq(componente)
console.log(noRepeat)
return noRepeat
  }

  function converteNomeParaOJson(componente:string) {
    switch (componente) {
        case 'Arte':
            return BNCCArteJson;
            break;
        case "Ciências":
            return BNCCCieJson;
            break;
        case "Ensino Religioso":
            return BNCCERJson;
            break;
        case "Educação Física":
            return BNCCEFJson;
            break;
        case "Geografia":
            return BNCCGeoJson;
            break;
        case "História":
            return BNCCHisJson;
            break;
        case "Língua Inglesa":
            return BNCCLIJson;
            break;
        case "Língua Portuguesa":
            return BNCCLPJson;
            break;
        case "Matemática":
            return BNCCMatJson;
            break;
        default:
            break;
    }
}