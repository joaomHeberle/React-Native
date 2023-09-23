import { Center, VStack, Text, View, Button, Spinner, Image, Switch } from 'native-base';
import storage from '@react-native-firebase/storage';
import React, { useState, useEffect } from 'react';
import { UserContext } from "../../assets/contexts/Context";
import * as IMAGEPICKER from 'expo-image-picker'
import { AtivContext } from '../../assets/contexts/AtividadeContext';
import { alterarImagemAtividade } from '../../Banco/Update';


export default function AltImagemAula({ navigation, route }) {
    const ativDado = React.useContext(AtivContext)
    const { id } = React.useContext(UserContext);



    const imgData = route.params.img
    const [image, setImage] = useState(imgData);
    const [flag,setFlag ] = useState(false);

    const [transferred, setTransferred] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState("teste");


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

          

        })


                    setTransferred(
                        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100)
                    );
                });

        try {
       
           await task;

       
            setUploading(false);

            // Alert.alert("Imagem salva", "Imagem salva com sucesso");




        } catch (error) {
            setUploading(false);
            console.log(error);
        }

    }



    function handleImagem(){
        imagemStorage(image)
    }

  



    

    const pickImage = async () => {
        let result = await IMAGEPICKER.launchImageLibraryAsync({
            mediaTypes: IMAGEPICKER.MediaTypeOptions.All,
         
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
       

             alterarImagemAtividade(ativDado.atividade.ID,url,{ navigation })
       
        }
     
      
    }, [url]);

    return (

        <View flex={1} bgColor="violet.26">


            <VStack flex={1}

                bgColor="violet.25"

                w="100%">
              
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
                            <Text>Cadastrar nova foto</Text>
                        </Button>)
                        ?    (flag && <Button onPress={handleImagem} rounded='md'
                        bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                        <Text>Cadastrar nova foto</Text>
                    </Button>)
                    : 
                    <Button onPress={()=>navigation.goBack()} rounded='md'
                        bg={'cadastrar.1'} fontFamily="choco" mt='100' >
                        <Text>Voltar</Text>
                    </Button>

                    
                    }




                </Center>



            </VStack >

        </View>
    );
}

