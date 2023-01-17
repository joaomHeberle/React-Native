
import Home from './src/screens/Home/Home'
import { NativeBaseProvider,Center } from 'native-base';
import React from 'react'
import CadProf from './src/screens/cadProf/CadProf';

export default function App() {
  return (
    <NativeBaseProvider>
        
    <CadProf/>
    
    </NativeBaseProvider>
 
  );
}
