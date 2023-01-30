
import Auth from '@react-native-firebase/auth'
import { NativeBaseProvider,extendTheme, Text, VStack } from 'native-base';
import React from 'react'
import { useFonts } from 'expo-font';
import MyNavigator from './src/Componentes/MyNavigator';
import { useEffect, useState } from 'react';






export default function App({navigation}) {
  const [user,setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    'choco': require('./src/assets/fonts/Chococooky.ttf'),
    'dance': require('./src/assets/fonts/DancingScript-Medium.ttf'),
    'dance-Bold':require('./src/assets/fonts/DancingScript-Bold.ttf'),
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
      body:'dance',
      bold:'dance-Bold'

    }

   });
useEffect(() => {
  const descrito=Auth().onAuthStateChanged(userLogado=>{
    setUser(userLogado);
   });
return descrito;
}, []);
  return (
    <NativeBaseProvider theme={theme}>
      {fontsLoaded?(
   
       <MyNavigator Login={user}></MyNavigator>
      )
   :(<VStack>
        
        <Text> aguarde </Text>
        </VStack>
        )
      }
   
    
    </NativeBaseProvider>
 
  );
}
