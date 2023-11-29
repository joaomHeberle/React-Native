import { Link, Icon, Center, VStack, Text, Button, View, Slide, Box, HStack, WarningIcon, Pressable } from 'native-base';
import React, { useEffect } from 'react';
import { Input } from '../../Componentes/Input';
import { cadProfSchema } from '../../assets/ValidacaoSchema'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CadastrarProfessor } from '../../Banco/Cadastros';
import { MotiView } from 'moti'
import { MaterialIcons } from "@expo/vector-icons";
export default function CadProf({ navigation }) {
    const [slide, setSlide] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(cadProfSchema)
    });
    async function handleCadProf(data) {
        const success = await CadastrarProfessor(data.email, data.senha, data.nome, { navigation })
        setSlide(success)
  
        setTimeout(() => {

            setSlide(false)
            console.log(slide)
        }, 7000)

    }

    React.useEffect(() => { 
        console.log(showPassword)
    
      }, [showPassword]);

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
                    Crie sua conta

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
                        <MotiView style={{ width: "100%" }}
                            from={{
                                opacity: 0,
                                translateX: -65 * (10 + 1),

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
                                name="email"
                                render={({ field: { onChange } }) => (


                                    <Input
                                        isRequired={true}
                                        autoCapitalize='words'
                                        autoComplete='off'
                                        returnKeyType='done'
                                        requerido={true}
                                        title="Email"
                                        onChangeText={onChange}
                                        errorMessage={errors.email?.message}
                                    />

                                )}

                            />
                        </MotiView>
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
                name="senha"
                render={({ field: { onChange } }) => (


                  <Input

                  
                    autoComplete='off'
                    returnKeyType='done'
                    title="Senha"
                    type={showPassword?"text":"password"}
                    paddingX="10"
                    onChangeText={onChange}
                    requerido={true}
                    errorMessage={errors.senha?.message}
                    InputRightElement={<Pressable onPress={() => {setShowPassword(!showPassword)}}>
                    <Icon as={
                    <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                     size={5} mr="2" color="black" />
                  </Pressable>}  />
                    
                )}

              />
                        </MotiView>

                    </Center>

                    <MotiView style={{ width: "100%" }}
                        from={{
                            opacity: 0,
                            translateY: 65 * (10 + 1),

                        }}
                        animate={{
                            opacity: 1,
                            translateY: 0

                        }}
                        transition={{
                            type: 'timing',
                            duration: 3000
                        }}
                    >
                        <Button onPress={handleSubmit(handleCadProf)} rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                            <Text fontSize="xl" color="coolGray.900" _dark={{
                                color: "warmGray.200"
                            }}>Cadastrar
                            </Text>
                        </Button>
                    </MotiView>

                    <HStack mt="6" justifyContent="center">

                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "3xl"
                        }} onPress={() =>
                            navigation.navigate('Home')


                        }
                        >
                            Já tenho uma conta
                        </Link>
                    </HStack>
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

