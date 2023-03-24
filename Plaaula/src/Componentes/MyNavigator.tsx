import Home from '../screens/Home/Home';
import CadProf from '../screens/cadProf/CadProf';

import LogadoRender from '../screens/Logado/LogadoRender';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';
import DetalheAula from './DetalheAula';




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
       
       headerTintColor: 'black',
       headerStyle: { backgroundColor: colors.fundo[1] },      
       headerTitleStyle:
       {
           fontFamily:'dance-Bold'
       },
       headerTitle:"Inicio"
}}
    />
<Stack.Screen name="CadProf" component={CadProf}options={{
       
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

</Stack.Navigator>

</NavigationContainer>


     );
}

export default MyNavigator;