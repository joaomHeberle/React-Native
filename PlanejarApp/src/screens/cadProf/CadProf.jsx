import { Center, Heading, VStack, KeyboardAvoidingView, FormControl } from 'native-base';

import { React, useRef } from 'react'
import { Platform } from 'react-native'
import { FormLabel } from '../../Componentes/FormLabel';
import { Input } from '../../Componentes/Input';


export default function CadProf() {
    const ref_Sobrenome = useRef(null);
    const ref_Email = useRef(null);



    return (

        <KeyboardAvoidingView h={{
            base: '1000px',
            lg: "auto"
        }} bgColor="blue.100" flex={1} behavior={Platform.select({
            ios: 'padding',
            android: 'padding',

        })}>
            <Heading my={30} textAlign='center' >
                Crie sua conta

            </Heading>
            <VStack flex={1} bgColor="blue.100" w="100%">

                <Center>
                <FormControl isRequired >
       <FormLabel>Nome</FormLabel>
                    <Input placeholder='Nome'
                        autoCapitalize='words'
                        autoComplete='off'
                        returnKeyType="next"
                        onSubmitEditing={() => {ref_Sobrenome.current.focus(); }}
                        blurOnSubmit={false}>
                        
                        </Input>
                        <FormLabel>Sobrenome</FormLabel>
                    <Input placeholder='Sobrenome' 
                   ref={ref_Sobrenome}
                    autoComplete='off' 
                    autoCapitalize='words'
                    returnKeyType="next"
                    onSubmitEditing={() => ref_Email.focus() } 
                    
                    >

                    </Input>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email' 
                    ref={ref_Email} 
                    autoComplete='off'
                    returnKeyType="next">

                    </Input>
                    <FormLabel>Senha</FormLabel>
                    <Input 
                    placeholder='Senha' 
                    autoComplete='off'
                    >

                    </Input>
                    </FormControl>
                </Center>

            </VStack >

        </KeyboardAvoidingView>
    );
}

