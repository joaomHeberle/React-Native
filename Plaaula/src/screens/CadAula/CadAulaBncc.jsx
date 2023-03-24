import { Center, VStack, Text, Button,CheckIcon, View,Select } from 'native-base';
import React from 'react';
import { Input } from '../../Componentes/Input';
import { useForm, Controller } from "react-hook-form";



export default function CadAulaBncc({navigation}) {
    const { control,register, handleSubmit, formState: { errors } } = useForm();
    function handleCadAula(data) {
             console.log(data);
    }

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
                        name="Ano"
                        render={({ field: { onChange } }) => (


                            <Select minWidth="200" accessibilityLabel="Choose Service" 
                            placeholder="Escolha um Ano"  onValueChange={onChange} _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={2} />
                              }} mt="1" >
                                
                                  <Select.Item label="UX Research" value="ux" onChangeText={onChange}/>
                                  <Select.Item label="Web Development" value="web"  onChangeText={onChange}/>
                                  <Select.Item label="Cross Platform Development" value="cross"  onChangeText={onChange}/>
                                  <Select.Item label="UI Designing" value="ui"  onChangeText={onChange}/>
                                  <Select.Item label="Backend Development" value="backend" onChangeText={onChange} />
                                </Select>

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
                <Button onPress={handleSubmit(handleCadAula)} rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                    <Text>Proximo</Text>
                </Button>
            
            </VStack >

        </View>
    );
}

