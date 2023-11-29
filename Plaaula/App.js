
import Auth from '@react-native-firebase/auth'
import { NativeBaseProvider,extendTheme, Text, VStack } from 'native-base';
import React from 'react'
import { useFonts } from 'expo-font';
import MyNavigator from './src/Componentes/MyNavigator';
import { useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

import{ UserProvider} from './src/assets/contexts/Context'

import {AtividadeProvider} from './src/assets/contexts/AtividadeContext';
import {LogBox} from 'react-native';

// LogBox.ignoreLogs(['This warning should be ignored.']);

// console.warn('')
// // console.warn('This warning should be ignored.')
LogBox.ignoreAllLogs()



export default function App({navigation}) {
  LogBox.ignoreAllLogs()
  const [user,setUser] = useState(null);
  const [userId,setUserId]= useState(null);
  const [fontsLoaded] = useFonts({
    'choco': require('./src/assets/fonts/Chococooky.ttf'),
    'dance': require('./src/assets/fonts/DancingScript-Medium.ttf'),
    'dance-Bold':require('./src/assets/fonts/DancingScript-Bold.ttf'),
    'roboto-medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'roboto-Bold':require('./src/assets/fonts/Roboto-Bold.ttf'),
  });


  const theme = extendTheme({
   
    colors:{

      violet:{
   

       25:"#D8BFD8",
        26:"#9400D3",
        27:"#DDA0DD"
      },
      cadastrar:{
        1:"#A020F0"
      },
      fundo:{
        1:"#D8BFD8"
      }
    },
    fonts:{
      heading:'choco',
      body:'roboto-medium',
      bold:'roboto-Bold'

    }

   });
useEffect(() => {
  Auth().onAuthStateChanged(userLogado=>{
    setUser(userLogado);
    if(userLogado!=null){
      setUserId(userLogado.uid);
    }

   });


}, []);
  return (

    <NativeBaseProvider theme={theme}>
      {fontsLoaded?(
        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 1000),
        <UserProvider User={user}>
        <AtividadeProvider>
       <MyNavigator Login={user} ID={userId}></MyNavigator>
       </AtividadeProvider>
       </UserProvider>

      )
   :(    <Text>e</Text>
        )
      }
   
    
    </NativeBaseProvider>
 
  );
}
