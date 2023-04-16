import * as React from "react";
import {View, Text,VStack,Button,Center,HStack, Link, Box } from "native-base";

import { cadastrarAtividade, CadastrarBNCC, Imprimi } from "../../Banco/Cadastros";
import CadAulaImagem from "../CadAula/CadAulaImagem";




function Logado({navigation}) {

    return (  

        <Box bgColor='violet.25' flex={1}>
  
     
        {/* <Button onPress={CadastrarBNCC}>
<Text>ver Json</Text>
        </Button> */}
        {/* <Button onPress={cadastrarAtividade}>
<Text>cadastra atividade test</Text>
        </Button> */}
        {/* <CadAulaImagem></CadAulaImagem> */}
        </Box>
       
    );
}

export default Logado;