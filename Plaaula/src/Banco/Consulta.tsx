
import firestore from '@react-native-firebase/firestore';



import _ from "lodash";
import { converteNomeParaOJson } from '../assets/functions/ConversorComponenteNome';

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
  export async function minhasAtividades(id:string,componente:string) {

    const atividades = await atividadeCollection.doc(id).get();
    const att=atividades._data.atividade;
//console.log(att)
     const filteredList= _.filter(att,obj=>{
         return _.has(obj,"componente") && _.includes(obj["componente"], componente);
     })
    
  //console.log(filteredList)
 return filteredList
  }



  //Internos
  export async function lerBnccObjetoInterno(disciplina:string,ano:string) {
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

return noRepeat
  }

export async function lerBnccHabilidadeInterno(disciplina:string,ano:string,Objeto:string) {
    const nome = converteNomeParaOJson(disciplina)
 
    const filteredList= _.filter(nome,obj=>{
        return _.has(obj,"ANO/FAIXA") && _.includes(obj["ANO/FAIXA"], ano);
    })


    const ObjetoFilteredList = _.filter(filteredList,obj=>{
        return _.has(obj,'OBJETOS DE CONHECIMENTO')&& _.includes(obj['OBJETOS DE CONHECIMENTO'], Objeto);
    })
    const habilidade= ObjetoFilteredList .map(habilidade=>{
        return (
          habilidade['HABILIDADES']
            )
    })

return habilidade
  }



  