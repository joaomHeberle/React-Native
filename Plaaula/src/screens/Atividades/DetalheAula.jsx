import * as React from "react";
import {View, Box, Text,Image, ScrollView, Center, Button,Divider, Popover, HStack, Modal, VStack, Radio } from "native-base";
import { useRoute } from "@react-navigation/native";
import {

    Pressable,
    SafeAreaView,
    TouchableOpacity
  } from 'react-native';
  import { useForm, Controller } from "react-hook-form";
import { AtivContext } from "../../assets/contexts/AtividadeContext";

import { yupResolver } from "@hookform/resolvers/yup";
import { CadDescricaoSchema } from "../../assets/ValidacaoSchema";
import GerarPDF from "../../assets/functions/GerarPDF";



export default function DetalheAula({ navigation }){

 


    const route = useRoute();
    const [imagem, setImagem] = React.useState();
    const ativDado = React.useContext(AtivContext)

    const { control, register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(CadDescricaoSchema)
  });
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Tabela</title>
  </head>
  <body>
      <table border="1">
      <caption style="font-size: 24pt; font-weight: bold;">Plano de aula</caption>
          <tr>
              <td  style="font-size: 22pt; ">Titulo</td>
              <td">${ativDado.atividade.titulo}</td> 
          </tr>
          <tr>
              <td style="font-size: 22pt;">Duração</td>
              <td>${ativDado.atividade.duracao}</td> 
          </tr>
          <tr>
              <td style="font-size: 22pt;">Metodologia</td>
              <td>${ativDado.atividade.metodologia}</td> 
          </tr>
          <tr>
              <td style="font-size: 22pt;">Ano</td>
              <td>${ativDado.atividade.ano}</td> 
          </tr>
          <tr>
              <td style="font-size: 22pt;">Componente Curricular</td>
              <td>${ativDado.atividade.componente}</td> 
          </tr>
          <tr>
              <td style="font-size: 22pt;">Objetos de conhecimento</td>
              <td>${ativDado.atividade.objetosConhecimento}</td> 
          </tr>
          <tr>
          <td style="font-size: 22pt;">Habilidade</td>
          <td>${ativDado.atividade.habilidades}</td> 
      </tr>
  </table>
</body>
</html>
  
  
`;

const imprimirPDF = () => {
    GerarPDF(html);
  }
    React.useEffect(() => {
        setImagem(ativDado.atividade.foto);
    
    }, []);

    return (
        <SafeAreaView bgColor="violet.25" style={{ flex: 1 }}>
             <Box w="100%" alignItems="center" bgColor="violet.26">
 <Button size={"lg"} m={2} onPress={imprimirPDF} colorScheme="cyan">Imprimir</Button>

 </Box>


<View flex={1} bgColor="violet.25">
  
    <ScrollView>
        <Box  marginBottom={"1.5"} marginRight={"1"}>
        <Text color={"cadastrar.1"} ml={5} my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
     
        Componente: {ativDado.atividade.componente}
</Text>
<Divider backgroundColor={"amber.900"}/>

    <Center>
    {imagem && <TouchableOpacity onPress={() => navigation.navigate('ImprimirImagemGeral',{img:imagem})}><Image width={'32'} height={'32'} alt='foto' source={{ uri: imagem }} />
              </TouchableOpacity>}
</Center>
<Divider backgroundColor={"amber.900"}/>
 <View flex={1} bgColor="purple.100">
 <Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
       Titulo: 
        </Text>
<Text my={30}  ml={5}  fontSize={"4xl"}
    fontFamily="bold">
   {ativDado.atividade.titulo}
</Text>
<Divider backgroundColor={"amber.900"}/>
<Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
        Ano: 
        </Text>
<Text my={30} ml={5}  fontSize={"4xl"}
    fontFamily="bold">
      {ativDado.atividade.ano}
</Text>
<Divider backgroundColor={"amber.900"}/>
<Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
        Objetos de conhecimentos: 
        </Text>
<Text my={30} ml={5}  fontSize={"4xl"}
    fontFamily="bold">
      {ativDado.atividade.objetosConhecimento}
</Text>
<Divider backgroundColor={"amber.900"}/>

<Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
       Habilidade:
        </Text>
<Text my={30} ml={5} fontSize={"4xl"}
    fontFamily="bold">
       {ativDado.atividade.habilidades}
        
</Text>
<Divider backgroundColor={"amber.900"}/>
<Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
       Duração:
        </Text>
<Text my={30} ml={5} fontSize={"4xl"}
    fontFamily="bold">
       {ativDado.atividade.duracao}
        
</Text>
<Divider backgroundColor={"amber.900"}/>
<Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
       Metodologia:
        </Text>
<Text my={30} ml={5} fontSize={"4xl"}
    fontFamily="bold">
       {ativDado.atividade.metodologia}
        
</Text>
</View>
</Box>
</ScrollView>
</View>
</SafeAreaView>
    )
}
