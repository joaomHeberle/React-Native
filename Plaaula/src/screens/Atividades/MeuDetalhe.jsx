import * as React from "react";
import {View, Box, Text,Image, ScrollView, Center, Button } from "native-base";
import { useRoute } from "@react-navigation/native";
import {

    SafeAreaView,

  } from 'react-native';
import { AtivContext } from "../../assets/contexts/AtividadeContext";
import { busca } from "../../Banco/Consulta";
import { UserContext } from "../../assets/contexts/Context";

export default function MeuDetalhe(){
    const route = useRoute();
    const [imagem, setImagem] = React.useState();
    const ativDado = React.useContext(AtivContext)
    const { id } = React.useContext(UserContext);

    React.useEffect(() => {
        setImagem(ativDado.atividade.foto);
    
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
<View flex={1} bgColor="violet.25">
  
    <ScrollView>
        <Box  marginBottom={"1.5"} marginRight={"1"}>
        <Text color={"cadastrar.1"} my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
        Componente: {ativDado.atividade.componente}
</Text>
<Center>
         {imagem && <Image width={'32'} height={'32'} alt='foto' source={{ uri: imagem }} 
                />}
 </Center>

<Text my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
    Titulo: {ativDado.atividade.titulo}
</Text>
<Text my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
        Ano:{ativDado.atividade.ano}
</Text>

<Text my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
        Objetos de conhecimentos:{ativDado.atividade.objetosConhecimento}
</Text>
<Text my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
        Habilidade:{ativDado.atividade.habilidades}
        ID:{ativDado.atividade.ID}
</Text>
<Button onPress={()=>busca(id,ativDado.atividade.ID)}></Button>

</Box>
</ScrollView>
</View>
</SafeAreaView>
    )
}
