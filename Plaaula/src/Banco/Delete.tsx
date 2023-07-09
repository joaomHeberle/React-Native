import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'
import * as React from "react";

import _ from "lodash";
import { converteNomeParaOJson } from '../assets/functions/ConversorComponenteNome';
import { BlankImage } from '../assets/imgUri/BlankImage';
import { useEffect } from 'react';




const bnccCollection = firestore().collection('BNCC');
const usuarioCollection = firestore().collection('Usuario');
const atividadeCollection = firestore().collection('Atividade');


export default async function DeleteAtividade(idAtividade:string,idUsuario:string){
//console.log(idAtividade,idUsuario)

  
  const atividades = await usuarioCollection.doc(idUsuario).get();
  const att = atividades._data.atividade;


const removido =_.without(att,idAtividade)

await usuarioCollection.doc(idUsuario).update({atividade:removido});
await atividadeCollection.doc(idAtividade).delete()
.then(() => {
  
  Alert.alert("Sucesso","atividade deletada com sucesso")
})
.catch((error) => Alert.alert(error));


}