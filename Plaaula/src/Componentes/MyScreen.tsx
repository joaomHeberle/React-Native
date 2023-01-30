import { createMaterialBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
const MyTabScreen = (props) => {
    return (
        <Tab.Screen
            {...props}
            options={{
                ...props.options,
                labelStyle: {
                    fontFamily: 'my-custom-font'
                }
            }}
        />
    );
}

export default MyTabScreen;