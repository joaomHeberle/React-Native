import Auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import BNCCJson from './BNCC banco/LP/1jc9q-f8otp.json';
import { at, result } from 'lodash';




const bnccCollection = firestore().collection('BNCC');
const atividadeCollection = firestore().collection('Atividade');
export function CadastrarProfessor(email:string, senha:string) {
 Auth()
 .createUserWithEmailAndPassword(email,senha)
 .then((result)=>{Alert.alert("Conta","Cadastrada com sucesso"+result.user.uid)})
 
 .catch((error)=>console.log(error))
 
//pega o id result.user.uid
}

export function Imprimi(){
//console.log(BNCCJson.ARTE[2]['ANO/FAIXA'])
console.log(BNCCJson.length)
}

export function CadastrarBNCC(){
  for(let i=0;i<=BNCCJson.length;i++){
  bnccCollection
    .doc("Lingua Portuguesa")
    .set({
      BNCC:BNCCJson,
      })
      
      .then(() => {
        console.log('User added!');
      });
    }
}
export async function lerAtividades (id){
  
 const atividades= await atividadeCollection.doc(id).get();

if(atividades._data==undefined)
 return false;
 return atividades._data.atividade;
}

export async function CadastrarAtividade(id,data){
  const atiBuffer=await lerAtividades(id);
  console.log(atiBuffer)
if(atiBuffer){


  atividadeCollection
  .doc(id)
  .set({atividade:[...atiBuffer,data]})
  .then(() => {
    console.log('User added!');
  })
  .catch((error)=>Alert.alert(error));
}else{

  atividadeCollection
  .doc(id)
  .set({atividade:[data]})
  .then(() => {
    console.log('User added!');
  })
  .catch((error)=>Alert.alert(error));
}
}
export function cadastrarAtividade(){
  const data=[{
    titulo:"a",
    createdAt:firestore.FieldValue.serverTimestamp(),
    isPublic:true,
    foto:"a",
    descricao:"",
    Componente:'',
    ano:"",
    objetosConhecimento:"",
    habilidades:""
  }]
  return data
}
