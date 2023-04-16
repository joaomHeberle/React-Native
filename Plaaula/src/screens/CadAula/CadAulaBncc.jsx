import { FormControl as FormBase, WarningOutlineIcon, Center, VStack, Text, Button, CheckIcon, View, Select, HStack } from 'native-base';
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { lerBncc, lerBnccInterno } from '../../Banco/Consulta';
import BarraInput from '../../Componentes/BarraInput';
import { yupResolver } from "@hookform/resolvers/yup";
import { cadAulaBnccSchema } from '../../assets/ValidacaoSchema';
import { ErrorMessage } from '@hookform/error-message';

export default function CadAulaBncc({ navigation, proximo }) {
    const [componente, setComponente] = React.useState([]);

    const { control, register, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(cadAulaBnccSchema)


    });
 
    async function handleCadAula(data) {
        // console.log(data);
        //pegaComponenteInterno(data)
        navigation.navigate('CadAulaImagem');
    }
    async function pegaComponente(data) {
        var disciplina = converteParaOBanco(data.Componente);
        var anoBuffer = data.Ano
        var ano = anoBuffer.substring(0, 2)
        var listaObjetos = await lerBncc(disciplina, ano)

    }
    async function pegaComponenteInterno() {
        const selectedComponenteValue =  watch("Componente")
        const SelectedAnoValue = watch("Ano")
        
        if (selectedComponenteValue && SelectedAnoValue) {
            var anoBuffer = SelectedAnoValue
            var ano = anoBuffer.substring(0, 2)
            var listaObjetos = await lerBnccInterno(selectedComponenteValue, ano)

            setComponente(listaObjetos)
        } else {
            console.log("Selected");
        }

    }
    // async function pegaComponenteInterno(data) {
    //     if(selectedComponenteValue&&SelectedAnoValue){
    //         var disciplina = converteParaOBanco(data.Componente);
    //         var anoBuffer = data.Ano
    //         var ano = anoBuffer.substring(0, 2)
    //         var listaObjetos = await lerBnccInterno(data.Componente, ano)
    //         // setComponente(listaObjetos.map(componente=>{
    //         //     return componente['OBJETOS DE CONHECIMENTO']
    //         // }))
    //         // console.log(listaObjetos.map(componente=>{
    //         //     return componente['OBJETOS DE CONHECIMENTO']
    //         // }))
    //         setComponente(listaObjetos)
    //     }

    // }
    function converteParaOBanco(componente) {
        switch (componente) {
            case 'Arte':
                return 'ARTE';
                break;
            case "Ciências":
                return 'Ciencias';
                break;
            case "Ensino Religioso":
                return 'Ensino Religioso';
                break;
            case "Educação Física":
                return 'Educacao fisica';
                break;
            case "Geografia":
                return 'geografia';
                break;
            case "História":
                return 'Historia';
                break;
            case "Língua Inglesa":
                return 'Lingua Inglesa';
                break;
            case "Língua Portuguesa":
                return 'Lingua Portuguesa';
                break;
            case "Matemática":
                return 'Matematica';
                break;
            default:
                break;
        }
    }

    const dados = ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano",
        "6º ano", "7º ano", "8º ano", "9º ano"]
    const componentDado = ["Arte", "Ciências", "Ensino Religioso",
        "Educação Física", "Geografia", "História", "Língua Inglesa",
        "Língua Portuguesa", "Matemática"]
    return (
        <View flex={1} bgColor="violet.26">





            <VStack flex={1}
                bgColor="violet.25"
                w="100%"

            >
                <BarraInput value={50}></BarraInput>
                <Center >

                    <Controller control={control}
                        name="Ano"
                      
                        render={({ field: { onChange } }) => (
                            <VStack marginTop={'1/5'}>
                                <Text style={{ marginLeft: 10 }}>Selecione um Ano:</Text>
                                <Select minWidth="200" accessibilityLabel="Escolha um ano"
                                    placeholder="Escolha um Ano" onValueChange={(value) => {
                                        onChange(value);
                                        pegaComponenteInterno();
                                    }}
                                    style={{ height: 50, marginLeft: 10 }}
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size={2} />
                                    }} mt="1" isInvalid={!!errors.Ano}>
                                    {dados.map(ano => {
                                        return <Select.Item key={ano} label={ano} value={ano} onChangeText={onChange} />
                                    })}
                                </Select>

                                <Center>
                                    {errors && <Text color={"red.500"}>{errors.Ano?.message}</Text>}
                                </Center>

                            </VStack>
                        )}
                    >


                    </Controller>


                    <Controller control={control}
                        name="Componente"

                        render={({ field: { onChange }, fieldState: { error } }) => (
                            <VStack marginTop={'1/5'}>
                                <Text style={{ marginLeft: 10 }}>Selecione um componente curricular:</Text>
                                <Select minWidth="200" accessibilityLabel="Escolha um Componente Curricular"
                                    placeholder="Escolha um Componente Curricular" onValueChange={(value) => {
                                        onChange(value);
                                        pegaComponenteInterno();
                                    }}
                                    style={{ height: 50, marginLeft: 10 }}
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size={2} />
                                    }} mt="1" >
                                    {componentDado.map(componente => {
                                        return <Select.Item key={componente} label={componente}
                                            value={componente} onChangeText={onChange} />
                                    })}
                                </Select>
                                <Center>
                                    {errors && <Text color={"red.500"}>{errors.Componente?.message}</Text>}
                                </Center>
                            </VStack>

                        )}

                    />

                    <Controller control={control}

                        name="Objeto"
                        render={({ field: { onChange },fieldState: { error }  }) => (
                            <VStack marginTop={'1/5'}>
                                <Text style={{ marginLeft: 10 }}>Selecione um objeto de conhecimento:</Text>
                                <Select minWidth="200" accessibilityLabel="Escolha um objeto de conhecimento"
                                     placeholder="Escolha um objeto de conhecimento" onValueChange={onChange}
                                    style={{ height: 50, marginLeft: 10 }}
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size={2} />
                                    }} mt="1" >
                                    {componente.map(objeto => {
                                        return <Select.Item key={objeto} label={objeto} value={objeto} onChangeText={onChange} />
                                        
                                    })}
                                </Select>
                                <Center>
                                    {errors && <Text color={"red.500"}>{errors.Objeto?.message}</Text>}
                                </Center>
                            </VStack>

                        )}
                    />






                </Center>


                <Button onPress={handleSubmit(handleCadAula)} rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                    <Text>Proximo</Text>
                </Button>

            </VStack >

        </View>
    );
}

