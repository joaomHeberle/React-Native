import { Link, Stack, Heading, HStack, Box, Center, Text, FlatList, SectionList, Image, Button, AspectRatio } from "native-base";
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
import converteDate from "../../assets/functions/ConverteDate";
import { AtivContext } from "../../assets/contexts/AtividadeContext";
const listaAtividades = test;



export function MinhaAtividade() {

  const { id } = React.useContext(UserContext);
  const route = useRoute();
  const componenteRecebido = converteNomeParaMinhaAtividade(route.params.nome)
  const navigation = useNavigation();
  const [atividade, setAtividade] = React.useState([]);
  const [imagem, setImagem] = React.useState();
  const ativDado = React.useContext(AtivContext)




  const register = (item) => {

    navigation.navigate("DetalheAula", {flag:true})
  }
  const montaContext = (item) => {
    ativDado.setAtividade(item)
  }
  const verAtividades = () => {

    console.log(id)
  }
  async function listar() {
    let aulas = []
    const minhaAtiv = await minhasAtividades(id, componenteRecebido)



    setAtividade(minhaAtiv)


  }
  function verificaImagem(item) {
    if (item) {
      return item
    } else {
      var foto = BlankImage();
      return foto;
    }


  }
  function pegaCodigoHabilidade(item) {
    var codigo = item;
    const match = codigo.match(/\((.*?)\)/);
    const resultado = match ? match[1] : null;
    // console.log(resultado)
    return resultado
  }
  

  React.useEffect(() => {

    listar();
  }, []
  );




  return (

    <SafeAreaView bgColor="violet.26" flex={1}>
      <Box flex={1} bgColor="violet.26">

        <FlatList mt={"3"} data={atividade} bgColor="violet.25" renderItem={({
          item
        }) =>
          <Box alignItems="center" mb={"2"} mt={"2"}>
            <Box onTouchStart={() => { navigation.navigate('MeuDetalhe'), montaContext(item) }} maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
                  fontSize: "md"
                }} position="absolute" bottom="0" px="3" py="1.5">
                  {item.ano}

                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="xl" ml="-1">
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
                <Text fontWeight="400" fontSize={"md"}>
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

    </SafeAreaView>
  );
}
