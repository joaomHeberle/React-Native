import { Center, VStack, Text, View, Button, Spinner, Image } from 'native-base';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { Alert, Platform } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Input } from '../../Componentes/Input';
import { cadProfSchema } from '../../assets/ValidacaoSchema'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CadastrarAtividade, CadastrarProfessor } from '../../Banco/Cadastros';
import { UserContext } from "../../assets/contexts/Context";
import * as IMAGEPICKER from 'expo-image-picker'

import uuid from 'react-native-uuid';
export default function CadAula({ navigation }) {
    const { id } = React.useContext(UserContext);
    const [image, setImage] = useState(null);
    const [allImage, setallImage] = useState([]);
    const [transferred, setTransferred] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState("");
    // const { control, handleSubmit, formState: { errors } } = useForm({
    //     resolver: yupResolver(cadProfSchema)
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
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100)
            );
        });

        try {
            await task;
            setUploading(false);

            Alert.alert("Imagem salva", "Imagem salva com sucesso");

            //  pegar o link da imagem nova salva
            // setUrl(storage().ref(`/images/atividades/${id}`)
            // .child(nome).getDownloadURL().toString());
         


        } catch (error) {
            setUploading(false);
            console.log(error);
        }

    }
    function handleCadImage() {

        imagemStorage(image);
    }

    function handleCadAtiTest() {
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
        CadastrarAtividade(id, Dados)
    }

    // useEffect(async() => {
    //     if(Platform.OS !=="web"){
    //         const{status} =await IMAGEPICKER.requestMediaLibraryPermissionsAsync();
    //         if(status !=='granted'){
    //             alert("Permissão negada");
    //     }
    // }
    // }, []);
    const pickImage = async () => {
        let result = await IMAGEPICKER.launchImageLibraryAsync({
            mediaTypes: IMAGEPICKER.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    return (

        <View flex={1} bgColor="violet.26">
            {/* <Button 
 //onPress={handleSubmit(handleCadAtiTest)}
 onPress={handleCadAtiTest}
  rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                    <Text>Cadastrar</Text>
                </Button> */}

            <Text my={30} textAlign='center' fontSize={"4xl"}
                fontFamily="bold">
                Cadastre uma atividade

            </Text>

            <VStack flex={1}

                bgColor="violet.25"

                w="100%">

                <Center>
                    <Button
                        // onPress={handleSubmit(handleCadProf)}
                        onPress={pickImage}
                        rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                        <Text>Escolher imagem</Text>
                    </Button>
                    
                    {image && <Image width={'32'} height={'32'} alt='foto' source={{ uri: image }}
                    />}
                    {uploading ?
                        (
                            <VStack space={2}>
                                <Spinner color="emerald.500" size="lg" mt='100' mx={'3'} />
                                <Text>{transferred} % Carregado</Text>
                            </VStack>)
                        :
                        (image &&<Button onPress={handleCadImage}rounded='md'
                         bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                            <Text>Cadastrar Imagem</Text>
                        </Button>)
                    }

<Button
                            // onPress={handleSubmit(handleCadProf)}
                            onPress={()=>{
                                console.log(url)
                            }}
                            rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                            <Text>Ver imagem</Text>
                        </Button>


                    {/*      <Controller control={control}
                        name="nome"
                        render={({ field: { onChange } }) => (


                            <Input
                                autoCapitalize='words'
                                autoComplete='off'
                                returnKeyType='done'
                                title="Nome"
                                requerido={true}
                                onChangeText={onChange}
                                errorMessage={errors.nome?.message}
                            />

                        )}

                    />
                    <Controller control={control}
                        name="email"
                        render={({ field: { onChange } }) => (


                            <Input
                                isRequired={true}
                                autoCapitalize='words'
                                autoComplete='off'
                                returnKeyType='done'
                                requerido={true}
                                title="Email"
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />

                        )}

                    />
                    <Controller control={control}
                        name="senha"
                        render={({ field: { onChange } }) => (


                            <Input
                                autoCapitalize='words'
                                autoComplete='off'
                                returnKeyType='done'
                                title="Senha"

                                paddingX="10"
                                onChangeText={onChange}
                                requerido={true}
                                errorMessage={errors.senha?.message}
                            />

                        )}

                    />



      */}
                </Center>

                {/* <Button onPress={handleSubmit(handleCadProf)} rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                    <Text>Cadastrar</Text>
                </Button> */}

            </VStack >

        </View>
    );
}

