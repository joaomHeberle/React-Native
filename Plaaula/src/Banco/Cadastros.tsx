import Auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import BNCCJson from './BNCC banco/LP/1jc9q-f8otp.json';
import { at, result } from 'lodash';
import uuid from 'react-native-uuid';



const bnccCollection = firestore().collection('BNCC');
const atividadeCollection = firestore().collection('Usuario');


export function CadastrarProfessor(email: string, senha: string, nome: string) {
  Auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((result) => { Alert.alert("Conta", "Cadastrada com sucesso" ), CadastrarUsuario(result.user.uid, nome) })

    .catch((error) => console.log(error))

  //pega o id result.user.uid
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
  // console.log(nome);

  return nome;
}
export async function CadastrarAtividade(id:string, data:any) {
  const atiBuffer = await lerAtividades(id);
  console.log(atiBuffer + "cadastrar atividade")

  var nome = await pegaNome(id)
  console.log(nome + "cadastrar")
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


export function cadastrarAtividade() {
  const Dados = {
    ID: uuid.v4(),
    titulo: "cs",
    isPublic: true,
    foto: "regina",
    descricao: "",
    Componente: "",
    ano: "",
    objetosConhecimento: "",
    habilidades: "",
    createdAt: new Date(),
  }
  const ID = "GeD6hZPbTSeCqKFhmQzfvgsmNSe2";
  CadastrarAtividade(ID, Dados)
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

