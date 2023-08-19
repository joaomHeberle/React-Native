import * as React from "react";
import { View, Text, VStack, Button, Center, HStack, Link } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from '../../Componentes/Input';

import { useForm, Controller } from "react-hook-form";
import { RecSchema } from '../../assets/ValidacaoSchema'
import { MotiView } from 'moti'
import { recuperaSenha } from "../../Banco/Update";

export default function RecuperarSenha({ navigation }) {
  //validação
  const { control, handleSubmit, formState: { errors } } = useForm({

    resolver: yupResolver(RecSchema)
  });
  function handleRecSenha(data) {
    if (data) {

      recuperaSenha(data.email, { navigation });

    }

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
          Recuperar Senha

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



            </MotiView>



            <Button onPress={handleSubmit(handleRecSenha)} rounded="3xl" bg={'cadastrar.1'}
              mt='100' mx={'3'} width={"2/4"}>
              <Text fontSize={'xl'}>Solicitar</Text>
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
            <HStack mt="6" justifyContent="center">

              <Link _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "3xl"
              }} onPress={() =>
                navigation.navigate('Home')


              }
              >
                Voltar
              </Link>
            </HStack>

          </MotiView>
        </VStack >

      </View>
    </MotiView>
  );
}




