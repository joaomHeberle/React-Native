import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'

import storage from '@react-native-firebase/storage';
import _, { forEach } from "lodash";
import Auth from '@react-native-firebase/auth'
import { sair } from './Auth';

const bnccCollection = firestore().collection('BNCC');
const usuarioCollection = firestore().collection('Usuario');
const atividadeCollection = firestore().collection('Atividade');


export default async function DeleteAtividade(idAtividade: string, idUsuario: string, link: string) {

  const atividades = await usuarioCollection.doc(idUsuario).get();
  const att = atividades._data.atividade;


  const removido = _.without(att, idAtividade)

  await usuarioCollection.doc(idUsuario).update({ atividade: removido });
  await atividadeCollection.doc(idAtividade).delete()
    .then(() => {
      deleteAtividadeStorage(link)
      Alert.alert("Sucesso", "atividade deletada com sucesso")
    })
    .catch((error) => Alert.alert(error));


}

async function deleteAtividadeStorage(link: string) {

  let linkCerto = await arrumaLink(link)

  console.log(linkCerto)
 




  const storageRef = storage().ref()
    .child(linkCerto);

  // Deleta o arquivo
  storageRef.delete().then(() => {
    console.log('Arquivo excluído com sucesso.');
  }).catch((error) => {
    console.error('Erro ao excluir a imagem:', error);
  });

}
function arrumaLink(link: string) {

  let test = link

  const index = test.indexOf("/images");
  if (index !== -1) {
    test = test.slice(index);
  }


  let linkCerto = test.replace(/%2F/g, '/');
  let linkCortado = linkCerto.split("?alt");
  const urlSemAlt = linkCortado[0];

  return urlSemAlt;


}

export async function deletarConta(Senha:String,id:string,{ navigation }){
  const atividades = await usuarioCollection.doc(id).get();
const email = Auth().currentUser.email;
const user = Auth().currentUser;
const credencial = Auth.EmailAuthProvider.credential(email, Senha);
const att = atividades._data.atividade;

const link = await linkAtividades(id)
 await user.reauthenticateWithCredential(credencial).then(() => {
  await user.delete().then(() => {
  att.forEach(element => {
   await DeleteAtividadeSemLink(element, id)
  
  });
  
  link.forEach(element=>{
    await deleteAtividadeStorage(element)
  })
 await DeleteUsuario(id);
  sair({ navigation });
  navigation.navigate('Home')
    console.log("deletado")
  }).catch((error) => {
    if(error.code=="auth/wrong-password"){
      Alert.alert("senha invalida")
    }
   
  });
  
}).catch((error)=>{
  if(error.code=="auth/wrong-password"){
    Alert.alert("senha invalida")
  }else{
    Alert.alert(error)
  }

});





}

async function DeleteUsuario(idUsuario: string) {




 
  await usuarioCollection.doc(idUsuario).delete()
    .then(() => {
     
      console.log("usuario deletado do firestore")
    })
    .catch((error) => Alert.alert(error));

}
async function DeleteAtividadeSemLink(idAtividade, idUsuario){
  const atividades = await usuarioCollection.doc(idUsuario).get();
  const att = atividades._data.atividade;

  const removido = _.without(att, idAtividade)

  await usuarioCollection.doc(idUsuario).update({ atividade: removido });
  await atividadeCollection.doc(idAtividade).delete()
    .then(() => {
    
  
      Alert.alert("Sucesso", "atividade deletada com sucesso")
    })
    .catch((error) => Alert.alert(error));


}
async function linkAtividades(id: string) {


  const atividades = await usuarioCollection.doc(id).get();
  let aulas = [];

  const att = atividades._data.atividade;

  for (const idAtividade of att) {
    const aula = await atividadeCollection.doc(idAtividade).get();
    aulas.push(aula._data.foto);
  }

  return aulas


}