import * as React from "react";
import {View, Text,VStack,Button,Center,HStack, Link, Box } from "native-base";
import CadAula from "../CadAula/CadAula";
import { CadastrarBNCC, Imprimi } from "../../Banco/Cadastros";




function Logado({navigation}) {

    return (  

        <Box bgColor='violet.25' flex={1}>
        <Text>Logado</Text>
         <CadAula></CadAula>
        {/* <Button onPress={CadastrarBNCC}>
<Text>ver Json</Text>
        </Button> */}
        </Box>
    );
}

export default Logado;