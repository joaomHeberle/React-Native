import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'


import _ from "lodash";
import { converteNomeParaOJson } from '../assets/functions/ConversorComponenteNome';
import { BlankImage } from '../assets/imgUri/BlankImage';
import { useEffect } from 'react';

const bnccCollection = firestore().collection('BNCC');
const usuarioCollection = firestore().collection('Usuario');
const atividadeCollection = firestore().collection('Atividade');


export default async function UpdateAtividade(idAtividade:string,dados:any){

    const aula = await atividadeCollection.doc(idAtividade)
    .update(dados).then(() => {
        //console.log('Foto cadastrada');
        Alert.alert("atividade atualziada com sucesso")
      })
      .catch((error) =>  {
        var erro = error+""
        if (erro.includes("firestore/not-found")) {
        Alert.alert("Atividade", "Atividade não existe" )
      }else{
        Alert.alert(error)
      }
      });


}

export async function UpdateAtividadeId(idAtividade:string){

  const aula = await atividadeCollection.doc(idAtividade)
  .update({ID:idAtividade}).then(() => {
      //console.log('Foto cadastrada');
      Alert.alert("atividade atualziada com sucesso")
    })
    .catch((error) =>  {
      var erro = error+""
      if (erro.includes("firestore/not-found")) {
      Alert.alert("Atividade", "Atividade não existe" )
    }else{
      Alert.alert(error)
    }
    });


}