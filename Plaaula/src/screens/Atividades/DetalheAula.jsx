import * as React from "react";
import {View, Box, Text,Image, ScrollView, Center, Button,Divider, Popover, HStack, Modal, VStack, Radio } from "native-base";
import { useRoute } from "@react-navigation/native";
import {

    Pressable,
    SafeAreaView,

  } from 'react-native';
  import { useForm, Controller } from "react-hook-form";
import { AtivContext } from "../../assets/contexts/AtividadeContext";
import { busca } from "../../Banco/Consulta";
import { UserContext } from "../../assets/contexts/Context";
import { yupResolver } from "@hookform/resolvers/yup";
import { CadDescricaoSchema } from "../../assets/ValidacaoSchema";
import { Input } from "../../Componentes/Input";
import { TextArea } from "../../Componentes/TextArea";
import UpdateAtividade from "../../Banco/Update";
import DeleteAtividade from "../../Banco/Delete";
import GerarPDF from "../../assets/functions/GerarPDF";

export default function DetalheAula({ navigation }){

  


    const route = useRoute();
    const [imagem, setImagem] = React.useState();
    const ativDado = React.useContext(AtivContext)
    const { id } = React.useContext(UserContext);
    const [isOpenDel, setIsOpenDel] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const [showModal3, setShowModal3] = React.useState(false);

    const { control, register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(CadDescricaoSchema)
  });

 

    React.useEffect(() => {
        setImagem(ativDado.atividade.foto);
    
    }, []);

    return (
        <SafeAreaView bgColor="violet.25" style={{ flex: 1 }}>





<View flex={1} bgColor="violet.25">
  
    <ScrollView>
        <Box  marginBottom={"1.5"} marginRight={"1"}>
        <Text color={"cadastrar.1"} ml={5} my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
       
        Componente: {ativDado.atividade.componente}
</Text>
<Divider backgroundColor={"amber.900"}/>

    <Center>
         {imagem && <Image width={'32'} height={'32'} alt='foto' source={{ uri: imagem }} 
                />}
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
{console.log(ativDado)}
</View>
</Box>
</ScrollView>
</View>
</SafeAreaView>
    )
}
