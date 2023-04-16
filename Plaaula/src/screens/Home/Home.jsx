import * as React from "react";
import {View, Text,VStack,Button,Center,HStack, Link } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from '../../Componentes/Input';
import {autenticacaoEmail} from '../../Banco/Auth' 
import { useForm, Controller } from "react-hook-form";
import { homeSchema } from '../../assets/ValidacaoSchema'
import { MotiView } from 'moti'

export default function Home({navigation}) {
  //validação
  const { control, handleSubmit, formState: { errors } } = useForm({
   
   resolver: yupResolver(homeSchema)
});
function handleCadProf(data) {
  if(data){
 
autenticacaoEmail(data.email,data.senha,{navigation});

  }

}
  return (

    <MotiView style={{flex:1}}
    from={{
      opacity:0
    }}
    animate={{
      opacity:1
    }}
    transition={{
      type:'timing',
      duration:3000
    }}
    >
  
      <View flex={1} bgColor="violet.26">
     

          <Text my={30} textAlign='center' fontSize={"4xl"}
              fontFamily="bold">
              Bem vindo ao Pla'pp

          </Text>
   
          <VStack flex={1}bgColor="violet.25"w="100%">

              <Center>
              <MotiView style={{width:"100%"}}
    from={{
      opacity:0,
      translateX: -65 * (10 + 1),
    
    }}
    animate={{
      opacity:1,
      translateX: 0
     
    }}
    transition={{
      type:'timing',
      duration:3000
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
                  <MotiView style={{width:"100%"}}
    from={{
      opacity:0,
      translateX: 65 * (10 + 1),
    
    }}
    animate={{
      opacity:1,
      translateX: 0
     
    }}
    transition={{
      type:'timing',
      duration:3000
    }}
    > 
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


</MotiView>



              <Button onPress={handleSubmit(handleCadProf)} rounded="3xl" bg={'cadastrar.1'}
              mt='100' mx={'3'} width={"2/4"}>
                  <Text fontSize={'xl'}>Entrar</Text>
              </Button>

            
              </Center>

              <MotiView style={{width:"100%"}}
    from={{
      opacity:0,
      translateY: 65 * (10 + 1),
    
    }}
    animate={{
      opacity:1,
      translateY: 0
     
    }}
    transition={{
      type:'timing',
      duration:3000
    }}
    > 
              <HStack mt="6" justifyContent="center">
            <Text fontSize="3xl" color="coolGray.900" _dark={{
            color: "warmGray.200"
          }}>
              Novo usuario.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "3xl"
          }} onPress={()=>
            navigation.navigate('CadProf')


          }
          >
        Crie sua conta
            </Link>
          </HStack>
       </MotiView>
          </VStack >
   
         
      </View>
      </MotiView>
  );
}




