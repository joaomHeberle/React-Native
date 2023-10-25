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
        var buffer = prox + 1;
        console.log(buffer)
        setProx(buffer)
    }
    function proximo(data) {
        console.log(data)
        setProx(data);
    }
    return (
        <View flex={1} bgColor="violet.26">
            <Text my={30} textAlign='center' fontSize={"3xl"}
                fontFamily="bold">
                Crie sua aula

            </Text>
            <VStack flex={1} bgColor="violet.25" w="100%">

                <CadDescricao navigation={navigation}></CadDescricao>


            </VStack>
        </View>

    )

}