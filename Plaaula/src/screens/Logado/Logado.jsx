import * as React from "react";

import { Text,Button, IconButton, FlatList, Icon, View, NativeBaseProvider, Box, Center, VStack,HStack, Avatar, Heading} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import AvatarImage from "../../Componentes/Avatar";
import UpdateAtividade from "../../Banco/Update";
import DeleteAtividade from "../../Banco/Delete";





function Logado({ navigation }) {
  
    
    const AppDrawer = () => {


        const icons = [{
            name: 'folder',
            bg: 'amber.600',
            title: 'Arte'
        }, {
            name: 'folder',
            bg: 'emerald.600',
            title: 'Ciências'
        }, {
            name: 'folder',
            bg: 'blue.600',
            title: 'E.R.'
        }, {
            name: 'folder',
            bg: 'violet.600',
            title: 'Ed. Física'
        }, {
            name: 'folder',
            bg: 'lime.600',
            title: 'Geografia'
        }, {
            name: 'folder',
            bg: 'pink.600',
            title: 'História'
        }, {
            name: 'folder',
            bg: 'coolGray.600',
            title: 'L. Inglesa'
        }, {
            name: 'folder',
            bg: 'darkBlue.600',
            title: 'L. Portuguesa'
        }, {
            name: 'folder',
            bg: 'emerald.600',
            title: 'Matemática'
        }];
        return <FlatList flex={1} mt={"1.5"} numColumns={3} data={icons} renderItem={({
            item
        }) => {
            return <Box>
                <Center>
                    <IconButton onTouchStart={() => navigation.navigate('MinhaAtividade', {
                        nome: item.title
                    })} m={"9"} borderRadius="full" bg={item.bg} variant="solid" p="3"
                        icon={
                            <Icon color="white" name={item.name} as={MaterialIcons} size="2xl" />
                        }
                    />
                    <Text fontSize={"2xl"}>{item.title}</Text>
                </Center>
            </Box>
        }} />;
    }
   
    return (
        <View flex={1} bgColor="violet.26">

            <HStack >
             
               <AvatarImage onTouchStart={() => navigation.navigate('ImagemPerfil')} ></AvatarImage>
                    {/* <Avatar onTouchStart={() => navigation.navigate('ImagemPerfil')} size="lg" source={{ uri: image }} /> */}
            
                    <Text alignItems="center" paddingLeft={"10"} fontSize={"4xl"} fontFamily="bold">Minhas Atividades</Text>
               
              

            </HStack>
            <Box bgColor="violet.25" flex={1}>
               

                <AppDrawer></AppDrawer>
             {/* <Button m={"0.5"} onPress={()=>UpdateAtividade("PA5CFamwhMJudEI3TFZH",{nome:"josue",cidade:"porto"})}>Update</Button> 
            <Button onPress={()=>DeleteAtividade("PA5CFamwhMJudEI3TFZH","oCWaFshuWWWI3rOOLpLEGSqJP9l2")}>Remove</Button>  */}
                  
                          
            </Box>
        </View>
    );
};


export default Logado;