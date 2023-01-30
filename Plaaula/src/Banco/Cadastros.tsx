import Auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import BNCCJson from './BNCC banco/LP/1jc9q-f8otp.json';




const bnccCollection = firestore().collection('BNCC');

export function CadastrarProfessor(email:string, senha:string) {
 Auth()
 .createUserWithEmailAndPassword(email,senha)
 .then((result)=>{Alert.alert("Conta","Cadastrada com sucesso")})
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


