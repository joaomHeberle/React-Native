import * as React from "react";
import {View, Text,VStack,Button,Center,HStack, Link } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from '../../Componentes/Input';
import {autenticacaoEmail} from '../../Banco/Auth' 
import { useForm, Controller } from "react-hook-form";
import { cadProfSchema } from '../../assets/ValidacaoSchema'

export default function Home({navigation}) {
  //validação
  const { control, handleSubmit, formState: { errors } } = useForm({
   
   
  // resolver: yupResolver(cadProfSchema)
});
function handleCadProf(data) {
  if(data){
 
autenticacaoEmail(data.email,data.senha,{navigation});

  }

}
  return (


      <View flex={1} bgColor="violet.26">


          <Text my={30} textAlign='center' fontSize={"4xl"}
              fontFamily="bold">
              Bem vindo ao Pla'pp

          </Text>
          <VStack flex={1}

              bgColor="violet.25"

              w="100%">

              <Center>

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
                  <Controller control={control}
                      name="senha"
                      render={({ field: { onChange } }) => (


                          <Input
                       
                              autoCapitalize='words'
                              autoComplete='off'
                              returnKeyType='done'
                              title="Senha"

                              paddingX="10"
                              onChangeText={onChange}
                              requerido={true}
                              errorMessage={errors.senha?.message}
                          />

                      )}

                  />




            
            
              <Button onPress={handleSubmit(handleCadProf)} rounded="3xl" bg={'cadastrar.1'}
              mt='100' mx={'3'} width={"2/4"}>
                  <Text fontSize={'md'}>Entrar</Text>
              </Button>
              </Center>
              <HStack mt="6" justifyContent="center">
            <Text fontSize="md" color="coolGray.900" _dark={{
            color: "warmGray.200"
          }}>
              Novo usuario.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "md"
          }} onPress={()=>
            navigation.navigate('CadProf')


          }
          >
        Crie sua conta
            </Link>
          </HStack>
          </VStack >

      </View>
  );
}




