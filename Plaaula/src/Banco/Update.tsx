import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'
import Auth from '@react-native-firebase/auth'


import _ from "lodash";


const bnccCollection = firestore().collection('BNCC');
const usuarioCollection = firestore().collection('Usuario');
const atividadeCollection = firestore().collection('Atividade');


export default async function UpdateAtividade(idAtividade:string,dados:any){

    const aula = await atividadeCollection.doc(idAtividade)
    .update(dados).then(() => {
        //console.log('Foto cadastrada');
        Alert.alert("Atividade","atividade atualizada com sucesso")
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
export async function UpdateNome(id:string,nome:string ,{navigation}){

  const aula = await usuarioCollection.doc(id)
  .update({nome:nome}).then(() => {
     
      Alert.alert("Nome","Nome atualizado com sucesso")
      navigation.navigate('Inicio');
    })
    .catch((error) =>  {
      var erro = error+""
      if (erro.includes("firestore/not-found")) {
      Alert.alert("Nome", "Usuario não existe" )
    }else{
      Alert.alert(error)
    }
    });


}

export async function UpdateAtividadeId(idAtividade:string){

  const aula = await atividadeCollection.doc(idAtividade)
  .update({ID:idAtividade}).then(() => {
      //console.log('Foto cadastrada');
      console.log("atividade atualizada com sucesso")
    })
    .catch((error) =>  {
      var erro = error+""
      if (erro.includes("firestore/not-found")) {
        console.log("Atividade não existe" )
    }else{
      Alert.alert(error)
    }
    });


}

export async function recuperaSenha(email:string,{navigation}){

 await Auth().sendPasswordResetEmail(email).then((result) => { 
    Alert.alert("Email", `
    um email de recuperação foi enviado para ${email}`)
    navigation.navigate('Home');

}).catch((error) => {

    Alert.alert("Email", "Email invalido/não cadastrado" )

})
}


export async function alterarImagemAtividade(id:string,imagem:any,{navigation}){

  const aula = await atividadeCollection.doc(id)
  .update({foto:imagem}).then(() => {
     
      Alert.alert("Imagem","Imagem atualizada com sucesso")
      navigation.navigate('Inicio');
    })
    .catch((error) =>  {
      var erro = error+""
      if (erro.includes("firestore/not-found")) {
      Alert.alert("Imagem", "Usuario não existe" )
    }else{
      Alert.alert(error)
    }
    });

//     console.log(id)
// console.log(imagem)

}