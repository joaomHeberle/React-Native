import * as React from "react";
import { View, Text, VStack, Button, Center, HStack, Link, Icon, Pressable } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from '../../Componentes/Input';
import { autenticacaoEmail } from '../../Banco/Auth'
import { useForm, Controller } from "react-hook-form";
import { homeSchema } from '../../assets/ValidacaoSchema'
import { MotiView } from 'moti'
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function Home({ navigation }) {
  const [showPassword, setShowPassword] = React.useState(false);

  //validação
  const { control, handleSubmit, formState: { errors } } = useForm({

    resolver: yupResolver(homeSchema)
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  function handleCadProf(data) {
    if (data) {

      autenticacaoEmail(data.email, data.senha, { navigation });

    }

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
          Bem vindo ao Plapp
        </Text>

        <VStack flex={1} bgColor="violet.25" w="100%">

          <Center>
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
                    InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="black" />} />
                

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



            <Button onPress={handleSubmit(handleCadProf)} rounded="3xl" bg={'cadastrar.1'}
              mt='100' mx={'3'} width={"2/4"}>
              <Text fontSize={'xl'}>Entrar</Text>
            </Button>


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
            <VStack mt="6" justifyContent="center">
              <Center>
                <HStack mb="6">
                  <Text fontSize="3xl" color="coolGray.900" _dark={{
                    color: "warmGray.200"
                  }}>
                
                  </Text>
                  <Link _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "3xl"
                  }} onPress={() =>
                    navigation.navigate('CadProf')


                  }
                  >
                       Novo usuario
                  </Link>
                </HStack>

                <Link _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "3xl"
                }} onPress={() =>
                  navigation.navigate("RecSenha")

                }
                >
                  Esqueci minha senha
                </Link>
              </Center>
            </VStack>
          </MotiView>
        </VStack >


      </View>
    </MotiView>
  );
}




