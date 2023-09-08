import * as React from "react";
import * as base from "native-base";
import storage from '@react-native-firebase/storage';
import { UserContext } from "../../assets/contexts/Context";
import * as IMAGEPICKER from 'expo-image-picker'
import { cadastrarFoto } from "../../Banco/Cadastros";
import { Alert } from 'react-native'
import GerarPDF, { gerarImg } from "../../assets/functions/GerarPDF";


export default function ImprimirImagem({ navigation, route }) {



    const imgData = route.params.img
    const [image, setImage] = React.useState(imgData);
    const [url, setUrl] = React.useState(imgData);
    const [uploading, setUploading] = React.useState(false);
    const [transferred, setTransferred] = React.useState(0);
    const [flag, setFlag] = React.useState(false);
    const { id } = React.useContext(UserContext);
   
    const voltar = () => {
        navigation.navigate('Perfil');
    }
    function handleImagem() {
        imagemStorage(image)
    }

    function handleCadFoto(Dados) {


        cadastrarFoto(id, Dados)


        navigation.navigate('Inicio')
    }
    const imprimir = () => {

        gerarImg(route.params.img)
      


    }



    return (
        <base.View flex={1} bgColor="violet.25">





            <base.Box bgColor='violet.25' mt={"10"}>
                <base.Center >



                    <base.Image alt={"foto perfil"} size={"2xl"} source={{ uri: image }} />

                    <base.Button onPress={imprimir} rounded='md' _text={{
                        color: "black",
                        fontSize: "lg",

                    }} bg={'cadastrar.1'} fontFamily="bold"
                        size={"lg"} mt={"1/6"}>Imprimir
                    </base.Button>

                </base.Center>

            </base.Box>



        </base.View>
    );
}
