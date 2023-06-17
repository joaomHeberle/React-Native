import { Center, VStack, Text, View, Button, Spinner, Image } from 'native-base';
import storage from '@react-native-firebase/storage';
import { Alert, Platform } from 'react-native'
import React, { useState, useEffect } from 'react';
import { CadastrarAtividade, CadastrarProfessor, cadastraAtividade } from '../../Banco/Cadastros';
import { UserContext } from "../../assets/contexts/Context";
import * as IMAGEPICKER from 'expo-image-picker'
import uuid from 'react-native-uuid';
import BarraInput from '../../Componentes/BarraInput';

import { AtivContext } from '../../assets/contexts/AtividadeContext';
import { BlankImage } from '../../assets/imgUri/BlankImage';


export default function CadAulaImagem({ navigation }) {
    const ativDado = React.useContext(AtivContext)
    const { id } = React.useContext(UserContext);


    const imgData = BlankImage

    const [image, setImage] = useState(imgData);
    const [flag,setFlag ] = useState(false);
    const [allImage, setallImage] = useState([]);
    const [transferred, setTransferred] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState("teste");
    const [dado,setDado]= useState()

    // const { control, handleSubmit,watch, formState: { errors } } = useForm({
    //    // resolver: yupResolver(cadProfSchema)
    // });


    async function imagemStorage(img) {
        

        let uriArray = img.split("/");
        let nome = uriArray[uriArray.length - 1];

        const reference = storage().ref(`/images/atividades/${id}/${nome}`);

        setTransferred(0);
        setUploading(true);

        const task = reference.putFile(img);

            task.on('state_changed', taskSnapshot => {
                    // Pega URL da imagem salva no banco de dados 
                    storage().ref(`/images/atividades/${id}`).child(nome).getDownloadURL()
                        .then((url) => (
                         setUrl(url)
                         
                        ));
        task.snapshot.ref.getDownloadURL().then( function(url_imagem){
           setUrl(url_imagem)

           // console.log(url_imagem)

        })


                    setTransferred(
                        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100)
                    );
                });

        try {
       
           await task;

       
            setUploading(false);

            Alert.alert("Imagem salva", "Imagem salva com sucesso");




        } catch (error) {
            setUploading(false);
            console.log(error);
        }

    }



    function handleImagem(){
        imagemStorage(image)
    }

    function handleCadAtividade(Dados) {
    
        console.log(Dados)



       //CadastrarAtividade(id, Dados)
 cadastraAtividade(Dados,id)

    navigation.navigate('Inicio')
    }


    const pickImage = async () => {
        let result = await IMAGEPICKER.launchImageLibraryAsync({
            mediaTypes: IMAGEPICKER.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setFlag(true)
        } else {
            setImage(imgData)
            setFlag(false)
        }

    }
    useEffect(() => {
        if(url!="teste"){
            let Dados;

             Dados = {

                ID: uuid.v4(),
                titulo: ativDado.atividade.titulo,
                isPublic: true,
                foto: url,
                metodologia: ativDado.atividade.metodologia,
                componente: ativDado.atividade.componente,
                ano: ativDado.atividade.ano,
                objetosConhecimento: ativDado.atividade.objetosConhecimento,
                habilidades: ativDado.atividade.habilidades,
                criadoEm: new Date(),
                duracao: ativDado.atividade.duracao
             }
             //console.log(Dados)
             handleCadAtividade(Dados)
       
        }else{
            console.log("nao entrou")
        }
     
      
    }, [url]);

    return (

        <View flex={1} bgColor="violet.26">


            <VStack flex={1}

                bgColor="violet.25"

                w="100%">
                <BarraInput value={100}></BarraInput>
                <Center>
                    <Button
                        // onPress={handleSubmit(handleCadProf)}
                        onPress={pickImage}
                        rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mb={"2"} mx={'4'} >
                        <Text>Escolher imagem</Text>
                    </Button>


                    <Image width={'32'} height={'32'} alt='foto'
                        source={{ uri: image }} />


                    {uploading ?
                        (
                            <VStack space={2}>
                                <Spinner color="emerald.500" size="lg" mt='100' mx={'3'} />
                                <Text>{transferred} % Carregado</Text>
                            </VStack>)
                        :
                        (flag && <Button onPress={handleImagem} rounded='md'
                            bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                            <Text>Cadastrar Imagem</Text>
                        </Button>)
                    }

                    {/* <Button
                        // onPress={handleSubmit(handleCadProf)}
                        onPress={() => {
                            console.log(url),
                            handleCadAtividade()

                        }}
                        rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                        <Text>Ver imagem</Text>
                    </Button> */}



                </Center>



            </VStack >

        </View>
    );
}

