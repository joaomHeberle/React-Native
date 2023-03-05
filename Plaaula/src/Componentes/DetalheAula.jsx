import * as React from "react";
import {View, Box, Text,Image, ScrollView, Center } from "native-base";
import { useRoute } from "@react-navigation/native";
import {

    SafeAreaView,

  } from 'react-native';

export default function DetalheAula(){
    const route = useRoute();
    const [imagem, setImagem] = React.useState();
    React.useEffect(() => {
        setImagem(route.params.foto);
    
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
<View flex={1} bgColor="violet.25">
    <ScrollView>
        <Box  marginBottom={"1.5"} marginRight={"1"}>
        <Text color={"cadastrar.1"} my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
        Componente: {route.params.Componente}
</Text>
<Center>
         {imagem && <Image width={'32'} height={'32'} alt='foto' source={{ uri: imagem }} 
                />}
 </Center>

<Text my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
    Titulo: {route.params.titulo}
</Text>
<Text my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
        Ano:{route.params.ano}
</Text>

<Text my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
        Objetos de conhecimentos:{route.params.objetosConhecimento}
</Text>
<Text my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
        Habilidade:{route.params.habilidades}
</Text>


</Box>
</ScrollView>
</View>
</SafeAreaView>
    )
}
