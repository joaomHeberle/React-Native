import { Center, VStack, Text, Button, View } from 'native-base';
import React from 'react';
import { Input } from '../../Componentes/Input';
import { cadProfSchema } from '../../assets/ValidacaoSchema'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CadastrarAtividade, CadastrarProfessor } from '../../Banco/Cadastros';
import { UserContext } from "../../assets/contexts/Context";

export default function CadAula({navigation}) {
    const {id}= React.useContext(UserContext);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(cadProfSchema)
    });
    
    function handleCadProf(data) {
              CadastrarProfessor(data.email,data.senha)
              navigation.navigate('Home');
    }
    function handleCadAtiTest(){
        const Dados={
            titulo:"cs",
            isPublic:true,
            foto:"regina",
            descricao:"",
            Componente:"",
            ano:"",
            objetosConhecimento:"",
            habilidades:"",
            createdAt:new Date(), 
          }
        CadastrarAtividade(id,Dados)
    }
    return (

        <View flex={1} bgColor="violet.26">
 <Button 
 //onPress={handleSubmit(handleCadAtiTest)}
 onPress={handleCadAtiTest}
  rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                    <Text>Cadastrar</Text>
                </Button>

            <Text my={30} textAlign='center' fontSize={"4xl"}
                fontFamily="bold">
               Cadastre uma atividade

            </Text>
            {/* <VStack flex={1}

                bgColor="violet.25"

                w="100%">

                <Center>
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




                </Center>
                <Button onPress={handleSubmit(handleCadProf)} rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                    <Text>Cadastrar</Text>
                </Button>
            
            </VStack > */}

        </View>
    );
}

