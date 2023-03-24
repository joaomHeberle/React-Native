import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { extendTheme, useTheme } from 'native-base';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Atividades from '../screens/Atividades/Atividades';
import Logado from '../screens/Logado/Logado';
import Perfil from '../screens/Perfil/Perfil';

import { StyleSheet } from 'react-native';

import CadAulaImagem from '../screens/CadAula/CadAulaImagem';
import CadAulaBncc from '../screens/CadAula/CadAulaBncc';

const Tab = createMaterialBottomTabNavigator();
const styles = StyleSheet.create({
    tab: {
      fontFamily: 'dance',
    },
  });
function MyTabsNavigator(props) {

    const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Logado"
      activeColor="black"

      inactiveColor='white'
      barStyle={{ 
        backgroundColor: colors.violet[26],
        
   
     }}
  
     
    >
      <Tab.Screen
        name="Inicio"
        component={Logado}
        
        options={{
          
          tabBarLabel: null,
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="home" color={color} size={32} />
          ),
 
        }}
      />
      <Tab.Screen
      
        name="Atividades"
        component={Atividades}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" color={color} size={32} />
          ),
     
        }}
        initialParams={props.ID}
      />
          <Tab.Screen
      
      name="CadAtividade"
      component={CadAulaBncc}
      options={{
        tabBarLabel: null,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="plus-box-outline" color={color} size={32} />
        ),
   
      }}
      initialParams={props.ID}
    />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={32} />
          ),
        }}
      />

    </Tab.Navigator>
    
  );
}

export default MyTabsNavigator;