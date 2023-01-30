import Auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import React from 'react'


export function autenticacaoEmail(email:string,senha:string,{navigation}){
Auth().signInWithEmailAndPassword(email,senha)
.then(()=> navigation.navigate('Logado'))
.catch(error=>{
    if(error.code === 'auth/wrong-password'){
        Alert.alert("Email ou senha invalida")
    }
    }) 

//pega o id result.user.uid

}

export function sair({navigation}) {
    Auth().signOut()
    .then(()=>
  
     navigation.navigate('Home')
     );
    

}