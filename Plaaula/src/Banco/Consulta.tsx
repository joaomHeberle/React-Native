
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'


import _ from "lodash";
import { converteNomeParaOJson } from '../assets/functions/ConversorComponenteNome';
import { BlankImage } from '../assets/imgUri/BlankImage';
import { useEffect } from 'react';

const bnccCollection = firestore().collection('BNCC');
const usuarioCollection = firestore().collection('Usuario');
const atividadeCollection = firestore().collection('Atividade');
//var aulas=[];
export async function lerBncc(disciplina: string, ano: string) {

  const atividades = await bnccCollection.doc(disciplina).get();
  const att = atividades._data.BNCC;
  const filteredList = _.filter(att, obj => {
    return _.has(obj, "ANO/FAIXA") && _.includes(obj["ANO/FAIXA"], ano);
  })

  //console.log(filteredList)
  return filteredList
}
export async function minhasAtividades(id: string, componente: string) {


  const atividades = await usuarioCollection.doc(id).get();
  let aulas=[];
  
  const att = atividades._data.atividade;
 
  for (const idAtividade of att) {
    const aula = await atividadeCollection.doc(idAtividade).get();
    aulas.push(aula._data);
  }


 //console.log(aulas)
  const filteredList = _.filter(aulas, obj => {
    return _.has(obj, "componente") && _.includes(obj["componente"], componente);
  })

  //console.log(filteredList)
  
  return filteredList

 
}



//Internos
export async function lerBnccObjetoInterno(disciplina: string, ano: string) {
  const nome = converteNomeParaOJson(disciplina)
  const filteredList = _.filter(nome, obj => {
    return _.has(obj, "ANO/FAIXA") && _.includes(obj["ANO/FAIXA"], ano);
  })
  const componente = filteredList.map(componente => {
    return (
      componente['OBJETOS DE CONHECIMENTO']
    )
  })
  // console.log(componente)
  const noRepeat = _.uniq(componente)

  return noRepeat
}

export async function lerBnccHabilidadeInterno(disciplina: string, ano: string, Objeto: string) {
  const nome = converteNomeParaOJson(disciplina)

  const filteredList = _.filter(nome, obj => {
    return _.has(obj, "ANO/FAIXA") && _.includes(obj["ANO/FAIXA"], ano);
  })


  const ObjetoFilteredList = _.filter(filteredList, obj => {
    return _.has(obj, 'OBJETOS DE CONHECIMENTO') && _.includes(obj['OBJETOS DE CONHECIMENTO'], Objeto);
  })
  const habilidade = ObjetoFilteredList.map(habilidade => {
    return (
      habilidade['HABILIDADES']
    )
  })

  return habilidade
}


export async function verTodasAtividades() {

  let data = [];
  await atividadeCollection.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        // Obtenha os dados do documento
        data.push(documentSnapshot.data());
        // console.log(data);
      });

    })
    .catch((error) => {
      var erro = error + "";

      Alert.alert("Aula", "Erro ao criar aula")

    });
  //console.log(data)
  return data;



}




export async function PegarFoto(id: string) {
  let foto;
  let foto_Blank = BlankImage
  const atividades = await usuarioCollection.doc(id).get()
    .then((querySnapshot) => {
      //console.log(querySnapshot._data.foto_Perfil)
      foto = querySnapshot._data.foto_Perfil
    });
  if (foto != "") {
    return foto
  } else {

    return foto_Blank

  }


}

export async function busca(idProf: string, idAtividade: string) {
  try {
    console.log(idAtividade)

    const querySnapshot = await usuarioCollection
      //.where('atividade.ID','array-contains',{ID: `${idAtividade}`} )
      //.where("atividade",'!=',[""])
      .where("atividade", "array-contains", { ID: `${idAtividade}` })
      .get()
    // .then((querySnapshot) => {
    console.log(querySnapshot)
    // })
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });

  } catch (error) {
    console.error('Erro ao executar a consulta: ', error);
  }
  //console.log(atividades)
  //   const att=atividades._data.atividade;
  // //console.log(att)
  //    const filteredList= _.filter(att,obj=>{
  //        return _.has(obj,"componente") && _.includes(obj["componente"], componente);
  //    })

  //console.log(atividades)
  //return filteredList

}