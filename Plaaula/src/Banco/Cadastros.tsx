import Auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import BNCCJson from './BNCC banco/LP/1jc9q-f8otp.json';
import { UpdateAtividadeId } from './Update';





const bnccCollection = firestore().collection('BNCC');
const usuarioCollection = firestore().collection('Usuario');
const atividadeCollection = firestore().collection('Atividade');
export function CadastrarProfessor(email: string, senha: string, nome: string, { navigation }): Promise<boolean> {
  return new Promise((resolve, reject) => {

    Auth()
      .createUserWithEmailAndPassword(email, senha)
      .then((result) => {
        Alert.alert("Conta", "Cadastrada com sucesso"),
          CadastrarUsuario(result.user.uid, nome)
        navigation.navigate('Logado');

        resolve(false);
      })
      .catch((error) => {
        var erro = error + "";

        if (erro.includes("auth/email-already-in-use")) {
          Alert.alert("Conta", "Erro Usuario ja existe")
        }
        resolve(true);
      })
  });
}
function CadastrarUsuario(uid: string, nome: string) {

  usuarioCollection
    .doc(uid)
    .set({
      nome: nome,
      foto_Perfil: "",
      atividade: []
    })
    .then(() => {
      console.log('criado Usuario na atividade');
    })
    .catch((error) => Alert.alert(error));

}

export function cadastrarFoto(uid: string, foto: string) {
  //console.log(foto.foto)
  usuarioCollection
    .doc(uid)
    .set({ foto_Perfil: foto.foto }, { merge: true })
    .then(() => {
      console.log('Foto cadastrada');
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
export async function lerAtividades(id: string) {

  const atividades = await usuarioCollection.doc(id).get();

  if (atividades._data == undefined)
    return false;
  return atividades._data.atividade;
}
async function pegaNome(id: string) {

  const buffer = await usuarioCollection.doc(id).get();

  const nome = buffer._data.nome;


  return nome;
}

export function cadastraAtividade(data: any, id: string) {

  atividadeCollection
    .add(data)
    .then((result) => {
      Alert.alert('Atividade','Atividade cadastrada com sucesso');
      //console.log(result._documentPath._parts[1])
      AdicionaIdAoUsuario(id, result._documentPath._parts[1])
      UpdateAtividadeId(result._documentPath._parts[1])
    })
    .catch((error) => Alert.alert(error));

}


export async function AdicionaIdAoUsuario(id: string, data: any) {
  const atiBuffer = await lerAtividades(id);


  var nome = await pegaNome(id)

  if (atiBuffer) {


    usuarioCollection
      .doc(id)
      .set({
        atividade: [...atiBuffer, data]
      }, { merge: true })
      .then(() => {
        console.log('Atividade adicionada com sucesso');
      })
      .catch((error) => Alert.alert(error));
  } else {

    usuarioCollection
      .doc(id)
      .set({
        atividade: [data]
      }, { merge: true })

      .then(() => {
        console.log('Atividade adicionada com sucesso');
      })
      .catch((error) => Alert.alert(error));
  }
}




