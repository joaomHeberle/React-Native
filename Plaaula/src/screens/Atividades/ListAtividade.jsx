import { AspectRatio, Stack, Heading, Link, Box, Center, Text, FlatList, SectionList, Image, Button, HStack, Avatar, VStack, Spacer, Flex, ScrollView, Spinner } from "native-base";

import { useEffect, useState } from "react";
import test from "../../Banco/test.json"

import _, { forEach } from "lodash";
import {

  SafeAreaView,

} from 'react-native';
import { BlankImage } from "../../assets/imgUri/BlankImage";
import { useNavigation } from "@react-navigation/native";
import { verTodasAtividades } from "../../Banco/Consulta";
import { Title } from "react-native-paper";
import converteDate from "../../assets/functions/ConverteDate";
import { isLoading } from "expo-font";
//const listaAtividades =test;


export function ListAtividade() {


  const navigation = useNavigation();
  const  [atividade, setAtividade] = useState([]);
const [listaAtividades,setListaAtividade] = useState([]);
  const [imagem, setImagem] = useState();
  const [loading, setLoading] = useState(true);
  let listaAti = []


  
function listaAtivi() {
 //console.log(atividade)
  atividade.forEach((val => {
    //console.log(val);
    listaAti.push(val)
  }))
  //console.log(listaAti)
   setListaAtividade ([].concat(...listaAti))
setLoading(false)
}
  //setAtividade(listaAtividades)
  //     const FilteredList=_.filter(listaAtividades,{'Componente':'Matematica'})
  //     .concat(_.filter(listaAtividades,{'Componente':'Lingua Portuguesa'}))
  //    .concat(_.filter(listaAtividades,{'Componente':'Arte'}))

  // const groupedList=_.chain(listaAtividades)
  //     .groupBy('Componente')
  //     .sortBy('titulo')    
  //     .value();

  //     console.log(groupedList)
  // console.log(FilteredList)
  //         const groupedList=_.chain(FilteredList)
  //         .groupBy('Componente')
  //         .sortBy('titulo')    
  //         .value();

  const register = (item) => {

    navigation.navigate("DetalheAula", {
      foto: item.foto,
      titulo: item.titulo,
      Criado: item.createdAt,
      metodologia: item.metodologia,
      Componente: item.Componente,
      ano: item.ano,
      objetosConhecimento: item.objetosConhecimento,
      habilidades: item.habilidades,
      duracao: item.duracao
    })
  }
  async function lista() {
    setAtividade(await verTodasAtividades())
    listaAtivi()
  }
  function verificaImagem(item) {
    if (item) {
      return item
    } else {
      var foto = BlankImage();
      return foto;
    }


  }

  function pegaNomeComponentes(item) {
    let componentes = []
  //console.log(item)
    forEach(item, (value) => {
      componentes.push(value.componente)

    })

    let componentesFiltrados = _.uniq(componentes)


    return componentesFiltrados
  }

  // function pegaCodigoHabilidade(item){
  //     var codigo = item;
  //     const match = codigo.match(/\((.*?)\)/);
  //     const resultado = match ? match[1] : null;
  //     // console.log(resultado)
  //     return resultado
  // }

  function separaComponente(item) {

    //console.log(listaAtividades)
    const filteredList = _.filter(listaAtividades, obj => {
      return _.has(obj, "componente") && _.includes(obj["componente"], item);
    })
    //console.log(filteredList)
    return filteredList
  }

  async function verTodas() {
    let todas = await verTodasAtividades()
    //console.log(todas)

  }

  useEffect(() => {

   lista();
    // listar();

  }, [atividade.length<1]
  );



if(loading){
  return(
    <SafeAreaView bgColor="violet.26" flex={1}>
      <Center width={"100%"}></Center>
      <Spinner color="emerald.500" size={"lg"} m="1/2"/>
      </SafeAreaView>
  )
}else{

  return (
    <SafeAreaView bgColor="violet.26" flex={1}>
      <Center width={"100%"}>
        <Flex>
       

          <FlatList mt={"3"} data={pegaNomeComponentes(listaAtividades)} bgColor="violet.25" renderItem={({
            item
          }) =>
            <Box alignItems="center" mb={"2"} mt={"2"} ml={"2"}>

              <Box>
                <Text textAlign={"center"} fontSize={"3xl"}>{item}</Text>

              </Box>

              <FlatList mt={"3"} horizontal data={separaComponente(item)} bgColor="violet.25" renderItem={({
                item
              }) =>
                <Box paddingRight={"3"} alignItems="center" mb={"2"} mt={"2"}>
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
                        {item.ano}

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
                            {converteDate(item.criadoEm)}
                         
                          </Text>
                        </HStack>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>


              }
              />

            </Box>


          }
          />



        </Flex>

      </Center>

    </SafeAreaView>
  );}
}
