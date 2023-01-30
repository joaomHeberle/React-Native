import * as React from "react";
import {View, Text,VStack,Button,Center,HStack, Link, Box } from "native-base";
import { sair } from "../../Banco/Auth";
import { Imprimi } from "../../Banco/Cadastros";



function Perfil({navigation}) {
    const signOut=()=>{
        sair({navigation});
    }
    return (  

        <Box bgColor='violet.25' flex={1}>
        <Text>Perfil</Text>
        <Button onPress={
           signOut
           // Imprimi
            }>Sair</Button>
        </Box>
    );
}

export default Perfil;