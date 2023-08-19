import { NavigationContainer } from "@react-navigation/native";
import MyTabsNavigator from "../../Componentes/MyTabsNavigator";
import Logado from "./Logado";

function LogadoRender(props) {


    return ( 

<MyTabsNavigator ID={props.route.params.ID}>

    </MyTabsNavigator>


     );
}

export default LogadoRender;