import Auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import BNCCJson from './BNCC banco/LP/1jc9q-f8otp.json';




const bnccCollection = firestore().collection('BNCC');
const atividadeCollection = firestore().collection('Usuario');

export function CadastrarProfessor(email: string, senha: string, nome: string,{navigation}): Promise<boolean> {
  return new Promise((resolve, reject) => {
   
    Auth()
      .createUserWithEmailAndPassword(email, senha)
      .then((result) => { 
        Alert.alert("Conta", "Cadastrada com sucesso" ),
        CadastrarUsuario(result.user.uid, nome)
        navigation.navigate('Logado');
     
        resolve(false);
      })
      .catch((error) => {
        var erro = error+"";
       
        if (erro.includes("auth/email-already-in-use")) {
          Alert.alert("Conta", "Erro Usuario ja existe" )
        }
        resolve(true);
      })
  });
}
function CadastrarUsuario(uid: string, nome: string) {

  atividadeCollection
    .doc(uid)
    .set({ nome: nome })
    .then(() => {
      console.log('criado Usuario na atividade');
    })
    .catch((error) => Alert.alert(error));

}





export function Imprimi() {
  //console.log(BNCCJson.ARTE[2]['ANO/FAIXA'])
  console.log(BNCCJson.length)
}

export function CadastrarBNCC() {
  for (let i = 0; i <= BNCCJson.length; i++) {
    bnccCollection
      .doc("Lingua Portuguesa")
      .set({
        BNCC: BNCCJson,
      })

      .then(() => {
        console.log('User added!');
      });
  }
}
export async function lerAtividades(id:string) {

  const atividades = await atividadeCollection.doc(id).get();

  if (atividades._data == undefined)
    return false;
  return atividades._data.atividade;
}
async function pegaNome(id:string) {

  const buffer = await atividadeCollection.doc(id).get();

  const nome = buffer._data.nome;


  return nome;
}
export async function CadastrarAtividade(id:string, data:any) {
  const atiBuffer = await lerAtividades(id);


  var nome = await pegaNome(id)

  if (atiBuffer) {


    atividadeCollection
      .doc(id)
      .set({
        nome: nome,
        atividade: [...atiBuffer, data]
      })
      .then(() => {
        console.log('Atividade adicionada com sucesso');
      })
      .catch((error) => Alert.alert(error));
  } else {

    atividadeCollection
      .doc(id)
      .set({
        nome: nome,
        atividade: [data]
      })

      .then(() => {
        console.log('Atividade adicionada com sucesso');
      })
      .catch((error) => Alert.alert(error));
  }
}




