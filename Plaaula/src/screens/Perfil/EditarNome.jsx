import { Link, Center, VStack, Text, Button, View, Slide, Box, HStack, WarningIcon } from 'native-base';
import React, { useEffect } from 'react';
import { Input } from '../../Componentes/Input';
import { altProfSchema} from '../../assets/ValidacaoSchema'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CadastrarProfessor } from '../../Banco/Cadastros';
import { MotiView } from 'moti'
import { UserContext } from '../../assets/contexts/Context';
import { UpdateNome } from '../../Banco/Update';
import { useRoute } from "@react-navigation/native";


export default function EditarNome({ navigation }) {
    const [slide, setSlide] = React.useState(false);
    const { id } = React.useContext(UserContext);
    const route = useRoute();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(altProfSchema)
    });
    async function handleAltProf(data) {


        const success = await UpdateNome(id,data.nome, { navigation })
        setSlide(success)
  
        setTimeout(() => {

            setSlide(false)
     
        }, 7000)

    }


    return (
        <MotiView style={{ flex: 1 }}
            from={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                type: 'timing',
                duration: 3000
            }}
        >
            <View flex={1} bgColor="violet.26">


                <Text my={30} textAlign='center' fontSize={"4xl"}
                    fontFamily="bold">
                    EDITAR NOME

                </Text>
                <VStack flex={1}

                    bgColor="violet.25"

                    w="100%">

                    <Center>
                        <MotiView style={{ width: "100%" }}
                            from={{
                                opacity: 0,
                                translateX: 65 * (10 + 1),

                            }}
                            animate={{
                                opacity: 1,
                                translateX: 0

                            }}
                            transition={{
                                type: 'timing',
                                duration: 3000
                            }}
                        >
                            <Controller control={control}
                                name="nome"
                                render={({ field: { onChange } }) => (


                                    <Input
                                    
                                        autoCapitalize='words'
                                        autoComplete='off'
                                        returnKeyType='done'
                                        title="Nome"
                                        requerido={true}
                                        onChangeText={onChange}
                                        errorMessage={errors.nome?.message}
                                    />

                                )}

                            />
                        </MotiView>
                        </Center>
                        <Button onPress={handleSubmit(handleAltProf)} rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                            <Text fontSize="xl" color="coolGray.900" _dark={{
                                color: "warmGray.200"
                            }}>Alterar
                            </Text>
                        </Button>
                
                </VStack >
              <Slide in={slide} placement="top" duration={200}>
                    <Box w="100%" p="2" borderRadius="xs" bg="red.800" alignItems="center" justifyContent="center" safeArea>
                        <HStack space={2}>
                            <WarningIcon size="4" color="red.200" mt="1" _dark={{
                                color: "red.200"
                            }} />
                            <Text color="red.600" textAlign="center" _dark={{
                                color: "red.200"
                            }} fontWeight="medium">
                                Erro no cadastro
                            </Text>
                        </HStack>
                    </Box>
                </Slide>
            </View>
        </MotiView>
    );
}

