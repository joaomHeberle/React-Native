import {Link,Stack,Heading,HStack, Box, Center,Text, FlatList,  SectionList,Image, Button, AspectRatio} from "native-base";
import { useRoute } from "@react-navigation/native";
import * as React from "react";
import test from "../../Banco/test.json"
import { UserContext } from "../../assets/contexts/Context";
import _ from "lodash";
import {

    SafeAreaView,

  } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { converteNomeParaMinhaAtividade } from "../../assets/functions/ConversorComponenteNome";
import { minhasAtividades } from "../../Banco/Consulta";
import { BlankImage } from "../../assets/imgUri/BlankImage";
const listaAtividades =test;



export function MinhaAtividade() {

    const { id } = React.useContext(UserContext);
    const route = useRoute();
    const componenteRecebido=  converteNomeParaMinhaAtividade(route.params.nome)
    const navigation = useNavigation();
    const [atividade,setAtividade] = React.useState([]);
    const [imagem,setImagem] = React.useState();
    // const [listaAtividades,setListaAtividades]=React.useState([]);
 
   // const FilteredList=_.filter(listaAtividades,{'Componente':''+componenteRecebido})


        // const groupedList=_.chain(listaAtividades)
        // .groupBy('Componente')
        // .sortBy('titulo')    
        // .value();

      

    const register = (item)=>{
       
    navigation.navigate("DetalheAula",{
    foto:item.foto,
    titulo:item.titulo,
    Criado:item.createdAt,
    metodologia: item.metodologia,
    Componente: item.Componente,
    ano: item.ano,
    objetosConhecimento: item.objetosConhecimento,
    habilidades:item.habilidades,
    duracao: item.duracao
    })
    }
    const verAtividades=()=>{
       
        console.log(id)
    }
  async function listar(){
     
 const minhaAtiv = await minhasAtividades(id,componenteRecebido)
            
 
      
    setAtividade(minhaAtiv)

     
}
function verificaImagem(item){
    if(item){
        return item
    }else{
        var foto = BlankImage();
        return foto;
    }


}
function pegaCodigoHabilidade(item){
    var codigo = item;
    const match = codigo.match(/\((.*?)\)/);
    const resultado = match ? match[1] : null;
    // console.log(resultado)
    return resultado
}

    React.useEffect(()=>{
      
       listar();
    },[]
    );

 

   
    return (
  <SafeAreaView bgColor="violet.26" flex={1}>
     <Box flex={1} bgColor="violet.26">
          {/* <Center bgColor="violet.25">  */}
    <FlatList mt={"3"} data={atividade} bgColor="violet.25" renderItem={({
      item
    }) =>
    <Box alignItems="center" mb={"2"} mt={"2"}>
<Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
borderColor: "coolGray.600",
backgroundColor: "gray.700"
}} _web={{
shadow: 2,
borderWidth: 0
}} _light={{
backgroundColor: "gray.50"
}}>
  <Box>
    <AspectRatio w="100%" ratio={16 / 10}>
      <Image source={{
       uri: verificaImagem(item.foto)
       
    }} alt="image" />
    </AspectRatio>
    <Center bg="violet.500" _dark={{
    bg: "violet.400"
  }} _text={{
    color: "warmGray.50",
    fontWeight: "700",
    fontSize: "xs"
  }} position="absolute" bottom="0" px="3" py="1.5">
      PHOTOS
    </Center>
  </Box>
  <Stack p="4" space={3}>
    <Stack space={2}>
      <Heading size="md" ml="-1">
        {item.titulo}
      </Heading>
      <Text fontSize="xs" _light={{
      color: "violet.500"
    }} _dark={{
      color: "violet.400"
    }} fontWeight="500" ml="-0.5" mt="-1">
        {pegaCodigoHabilidade(item.habilidades)}
        {/* {item.habilidades} */}

      </Text>
    </Stack>
    <Text fontWeight="400">
      {item.objetosConhecimento}
    </Text>
    <HStack alignItems="center" space={4} justifyContent="space-between">
      <HStack alignItems="center">
        <Text color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="400">
          6 mins ago
        </Text>
      </HStack>
    </HStack>
  </Stack>
</Box>
</Box>


}
  />
<Text color={"red.900"}>{}</Text>
   
  
    {/* <Button onPress={verAtividades}> ver atividade</Button> */}

    </Box> 

    </SafeAreaView>
    );
}