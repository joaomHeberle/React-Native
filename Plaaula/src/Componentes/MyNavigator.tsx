import Home from '../screens/Home/Home';
import CadProf from '../screens/cadProf/CadProf';

import LogadoRender from '../screens/Logado/LogadoRender';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';
import DetalheAula from './DetalheAula';
import ImagemPerfil from '../screens/Perfil/ImagemPerfil';
import CadAulaBncc from '../screens/CadAula/CadAulaBncc';
import CadAula from '../screens/CadAula/CadAula';
import CadAulaImagem from '../screens/CadAula/CadAulaImagem';




const Stack = createNativeStackNavigator();


function MyNavigator(props) {
   
    let ini="Home";
    const { colors } = useTheme();

    if(props.Login){
        ini="Logado"
        //console.log(props.ID)

    }else{
       ini="Home"
    }

  

    return ( 

        <NavigationContainer>
            
        <Stack.Navigator     
        initialRouteName={ini}>

<Stack.Screen name="Home" component={Home} options={{
        headerShown: false,
       headerTintColor: 'black',
       headerStyle: { backgroundColor: colors.fundo[1] },      
       headerTitleStyle:
       {
           fontFamily:'dance-Bold'
       },
       headerTitle:"Inicio"
}}
    />
    <Stack.Screen name="DetalheAula" component={DetalheAula} options={{
          headerShown: false,
       headerTintColor: 'black',
       headerStyle: { backgroundColor: colors.fundo[1] },      
       headerTitleStyle:
       {
           fontFamily:'dance-Bold'
       },
       headerTitle:"Detalhe"
}}
    />

<Stack.Screen name="ImagemPerfil" component={ImagemPerfil} options={{
          headerShown: false,
       headerTintColor: 'black',
       headerStyle: { backgroundColor: colors.fundo[1] },      
       headerTitleStyle:
       {
           fontFamily:'dance-Bold'
       },
       headerTitle:"Detalhe"
}}
    />
<Stack.Screen name="CadProf" component={CadProf}options={{
       headerShown: false,
       headerTintColor: 'black',
       headerStyle: { backgroundColor: colors.fundo[1]  },      
       headerTitleStyle:{
           fontFamily:'dance-Bold'
       },
       headerTitle:"Cadastre-se"
}} />
<Stack.Screen name="Logado" component={LogadoRender} initialParams={props.ID} options={{
        headerShown: false,
       headerTintColor: 'black',
       headerStyle: { backgroundColor: colors.fundo[1]  },      
       headerTitleStyle:{
           fontFamily:'dance-Bold'
       },
       headerTitle:"Logado"
}} />
<Stack.Screen name="CadBncc" component={CadAulaBncc} initialParams={props.ID} options={{
        // headerShown: false,
       headerTintColor: 'black',
       headerStyle: { backgroundColor: colors.violet[26]  },      
       headerTitleStyle:{
           fontFamily:'dance-Bold'
       },
       headerTitle:"Cadastro"
}} />
<Stack.Screen name="CadAulaImagem" component={CadAulaImagem} initialParams={props.ID} options={{
     
       headerTintColor: 'black',
       headerStyle: { backgroundColor: colors.violet[26]   },      
       headerTitleStyle:{
           fontFamily:'dance-Bold'
       },
       headerTitle:"Cadastro"
}} />

</Stack.Navigator>

</NavigationContainer>


     );
}

export default MyNavigator;