import { Box, FormControl as FormBase, Center, VStack, Text, Button, CheckIcon, View, Select, HStack } from 'native-base';
import React from 'react';
import { Input } from '../../Componentes/Input';
import { useForm, Controller } from "react-hook-form";
import { lerBncc, lerBnccInterno } from '../../Banco/Consulta';



export default function CadAulaBncc({ navigation }) {
    const [componente, setComponente] = React.useState([]);
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    async function handleCadAula(data) {
        console.log(data);
        pegaComponenteInterno(data)
    }
    async function pegaComponente(data) {
        var disciplina = converteParaOBanco(data.Componente);
        var anoBuffer = data.Ano
        var ano = anoBuffer.substring(0, 2)
        var listaObjetos = await lerBncc(disciplina, ano)
        console.log(listaObjetos)
    }
    async function pegaComponenteInterno(data) {
        var disciplina = converteParaOBanco(data.Componente);
        var anoBuffer = data.Ano
        var ano = anoBuffer.substring(0, 2)
        var listaObjetos = await lerBnccInterno(data.Componente, ano)
        // setComponente(listaObjetos.map(componente=>{
        //     return componente['OBJETOS DE CONHECIMENTO']
        // }))
        // console.log(listaObjetos.map(componente=>{
        //     return componente['OBJETOS DE CONHECIMENTO']
        // }))
        setComponente(listaObjetos)
    }
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


            <Text my={30} textAlign='center' fontSize={"5xl"}
                fontFamily="bold">
                Crie sua Atividade

            </Text>
            <VStack flex={1}
                bgColor="violet.25"
                w="100%">

                <Center>
                <Controller control={control}
                        name="titulo"
                        render={({ field: { onChange } }) => (
                            <Input
                                isRequired={true}
                                autoCapitalize='words'
                                autoComplete='off'
                                returnKeyType='done'
                                requerido={true}
                                title="Titulo"
                                onChangeText={onChange}
                                errorMessage={errors.titulo?.message}
                            />
                        )}
                    />
                    
                    <Controller control={control}
                        name="descricao"
                        render={({ field: { onChange } }) => (
                            <Input
                                autoCapitalize='words'
                                autoComplete='off'
                                returnKeyType='done'
                                title="Descrição"
                                paddingX="10"
                                onChangeText={onChange}
                                requerido={true}
                                errorMessage={errors.descricao?.message}
                            />
                        )}
                    />
                    <Controller control={control}
                        name="Ano"
                        render={({ field: { onChange } }) => (
                            <VStack>
                                <Text style={{ marginLeft: 10 }}>Selecione um Ano:</Text>
                                <Select minWidth="200" accessibilityLabel="Escolha um ano"
                                    placeholder="Escolha um Ano" onValueChange={onChange}
                                    style={{ height: 50, marginLeft: 10 }}
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size={2} />
                                    }} mt="1" >
                                    {dados.map(ano => {
                                        return <Select.Item key={ano} label={ano} value={ano} onChangeText={onChange} />
                                    })}
                                </Select>
                            </VStack>
                        )}
                    />
                    <Controller control={control}
                        name="Componente"
                        render={({ field: { onChange } }) => (
                            <VStack>
                                <Text style={{ marginLeft: 10 }}>Selecione um componente curricular:</Text>
                                <Select minWidth="200" accessibilityLabel="Escolha um Componente Curricular"
                                    placeholder="Escolha um Componente Curricular" onValueChange={onChange}
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
                            </VStack>

                        )}
                    />
                    <Controller control={control}
                        name="Objeto"
                        render={({ field: { onChange } }) => (
                            <VStack>
                                <Text style={{ marginLeft: 10}}>Selecione um objeto de conhecimento:</Text>
                                <Select minWidth="200" accessibilityLabel="Escolha um objeto de conhecimento"
                                    placeholder="Escolha um objeto de conhecimento" onValueChange={onChange}
                                    style={{ height: 50, marginLeft: 10}}
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size={2} />
                                    }} mt="1" >
                                    {componente.map(objeto => {
                                        return <Select.Item  key={objeto} label={objeto} value={objeto} onChangeText={onChange} />
                                    })}
                                </Select>
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

