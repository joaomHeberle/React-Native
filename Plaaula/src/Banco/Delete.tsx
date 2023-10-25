import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'

import storage from '@react-native-firebase/storage';
import _ from "lodash";
import Auth from '@react-native-firebase/auth'

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
  // Referência ao arquivo que você deseja excluir
  //const storageRef = storage().ref().child(link);
  let linkCerto = await arrumaLink(link)

  console.log(linkCerto)
  let id = 2
  let nome = 1





  const storageRef = storage().ref()
    .child(linkCerto);

  // Deleta o arquivo
  storageRef.delete().then(() => {
    console.log('Arquivo excluído com sucesso.');
  }).catch((error) => {
    console.error('Erro ao excluir o arquivo:', error);
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

export async function deletarConta(id:string){
  const usuario = Auth().currentUser.cre;
  const credencial = Auth().cre;

  console.log(user)
// Auth().currentUser.getIdToken(true);
// Auth().currentUser.delete();


}

