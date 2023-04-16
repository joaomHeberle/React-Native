import CadDescricao from "./CadDescricao";
import { Box, FormControl as FormBase, Center, VStack, Text, Button, CheckIcon, View, Select, HStack } from 'native-base';
import React from 'react';
import { Input } from '../../Componentes/Input';
import { useForm, Controller } from "react-hook-form";
import { lerBncc, lerBnccInterno } from '../../Banco/Consulta';
import { TextArea } from '../../Componentes/TextArea';
import CadAulaImagem from "./CadAulaImagem";
import CadAulaBncc from "./CadAulaBncc";
import MyTabsNavigator from "../../Componentes/MyTabsNavigator";
import BarraInput from "../../Componentes/BarraInput";

export default function CadAula({ navigation }) {
    const { control, register, handleSubmit, formState: { errors } } = useForm({

    });
const [prox, setProx] = React.useState(0);

function handleCadAula(data) {
    var buffer = prox+1;
    console.log(buffer)
setProx(buffer)
}
function proximo(data){
    console.log(data)
setProx(data);
}
return(
    <View flex={1} bgColor="violet.26">
    <Text my={30} textAlign='center' fontSize={"5xl"}
    fontFamily="bold">
    Crie sua Atividade

</Text>
<VStack flex={1} bgColor="violet.25"w="100%">

<CadDescricao navigation={navigation}></CadDescricao>
   {/* {prox==0&& <CadDescricao proximo={proximo}></CadDescricao>}

    {prox==2&& <CadAulaImagem proximo={proximo}></CadAulaImagem>}
   
   {prox==1&& <CadAulaBncc proximo={proximo}></CadAulaBncc>} */}
   
    {/* <Button onPress={handleSubmit(handleCadAula)} rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                    <Text>Proximo</Text>
                </Button> */}
         
                </VStack>
</View>

)

}