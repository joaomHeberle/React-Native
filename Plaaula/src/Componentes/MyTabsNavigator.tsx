import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { extendTheme, useTheme } from 'native-base';
import { MD3Theme, } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Atividades from '../screens/Atividades/Atividades';
import Logado from '../screens/Logado/Logado';
import Perfil from '../screens/Perfil/Perfil';
import MyTabScreen from './MyScreen';
import { StyleSheet } from 'react-native';
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
          
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
 
        }}
      />
      <Tab.Screen
      
        name="Atividades"
        component={Atividades}
        options={{
          tabBarLabel: 'Atividades',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" color={color} size={26} />
          ),
     
        }}
        initialParams={props.ID}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
    
  );
}

export default MyTabsNavigator;