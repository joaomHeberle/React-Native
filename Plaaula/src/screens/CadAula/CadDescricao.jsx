import {  Center, VStack, Text,  View, HStack, Button } from 'native-base';
import React from 'react';
import { Input } from '../../Componentes/Input';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextArea } from '../../Componentes/TextArea';
import { CadDescricaoSchema } from '../../assets/ValidacaoSchema';
import { TouchableWithoutFeedback,Keyboard} from 'react-native';
import MyTabScreen from '../../Componentes/MyScreen';
import MyTabsNavigator from '../../Componentes/MyTabsNavigator';
import BarraInput from '../../Componentes/BarraInput';


export default function CadDescricao({ navigation}) {
    const [componente, setComponente] = React.useState([]);
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(CadDescricaoSchema)
    });
 function handleCadAula(data) {
    navigation.navigate('CadBncc');
    }




    return (
        <View flex={1} bgColor="violet.26">
            
      
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
                                accessible={false}>

            <VStack flex={1}
                bgColor="violet.25"
                w="100%">
 <BarraInput value={0}></BarraInput>
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
               <Center>
                                <Controller control={control}
                        name="duracao"
                        
                        render={({ field: { onChange } }) => (
                            
                            <Input 
                            w={'1/5'}
                            maxLength={2}
                            keyboardType='numeric'
                                isRequired={true}
                                autoCapitalize='words'
                                autoComplete='off'
                                returnKeyType='done'
                                requerido={true}
                                title="Duração em Minutos"
                                onChangeText={onChange}
                                errorMessage={errors.duracao?.message}
                            />
                        
                        )}
                        
                    />
                 
                 </Center>
               
                    <Controller control={control}
                        name="descricao"
                        render={({ field: { onChange } }) => (
                            <TextArea
                                keyboardType='name-phone-pad'
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
                
                    </Center>
                    <Button onPress={handleSubmit(handleCadAula)} rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                    <Text>Proximo</Text>
                </Button>
                    </VStack>
                    </TouchableWithoutFeedback>
                    </View>
                    )
                        }