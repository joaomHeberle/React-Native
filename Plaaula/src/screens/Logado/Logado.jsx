import * as React from "react";

import { Text, Button, IconButton, FlatList, Icon, View, NativeBaseProvider, Box, Center, VStack, HStack, Avatar, Heading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import AvatarImage from "../../Componentes/Avatar";
import { UserContext } from "../../assets/contexts/Context";
import { PegarNome } from "../../Banco/Consulta";




function Logado({ navigation }) {
    const[nome,setNome]= React.useState("")
    const { id } = React.useContext(UserContext);
    const isFocused = useIsFocused();
    const [flag,setFlag] = React.useState(false)
    const [badgeCount,setBadgeCount] = React.useState(1)
    const contador =()=>{
        setBadgeCount(badgeCount+1)
       
    }

  


    const AppDrawer = () => {


        const icons = [{
            name: 'folder',
            bg: 'amber.600',
            title: 'Arte'
        }, {
            name: 'folder',
            bg: 'purple.800',
            title: 'Ciências'
        }, {
            name: 'folder',
            bg: 'blue.600',
           
            title: 'Ed. Física'
        }, {
            name: 'folder',
            bg: 'violet.600',
            title: 'E. Religioso'
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
            title: 'Português'
        }, {
            name: 'folder',
            bg: 'emerald.600',
            title: 'Matemática'
        }];
        React.useEffect(() => { 
            async function fetchData() {
               // console.log("FlatList foi renderizada!");
              
              setNome(await PegarNome(id));
            
            }
            fetchData();
          }, [id,isFocused]);
        //   React.useEffect(() => { 
          
        //         console.log("FlatList foi renderizada!");
        //      setBadgeCount(badgeCount+1)
           
         
        //   }, [icons]);

        return       <Box flex={1} justifyContent={"center"} alignItems={"center"}>
      
            <Heading style={{ textAlign: 'center' }} >Bem vindo(a) {nome.toUpperCase()}</Heading>

                <FlatList flex={1} mt={"1.5"} numColumns={3} data={icons} renderItem={({
                item
                
            }) => {
                return <Box >
                    <Center>
                        <IconButton onTouchStart={() => navigation.navigate('MinhaAtividade', {
                            nome: item.title
                        })} m={"9"} borderRadius="full" bg={item.bg} variant="solid" p="3"
                            icon={
                                <Icon color="white" name={item.name} as={MaterialIcons} size="2xl" />
                                
                            }
                        />
        {/* {badgeCount > 0 && (
          <Text fontSize="sm" style={{
            position: 'absolute',
            right: 20,
            top: 20,
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }} color="darkBlue.600"> 
            {badgeCount}
          </Text>
        )} */}
                        <Text fontSize={"xl"}>{item.title}</Text>
                    </Center>
                </Box>
            }} />
 

        </Box>
    }

    return (
        <View flex={1} bgColor="violet.26">

            <HStack >

                <AvatarImage onTouchStart={() => navigation.navigate('ImagemPerfil')} ></AvatarImage>

                <Text alignItems="center" m="2"  fontSize={"3xl"} fontFamily="bold">
                    Minhas Atividades
                    </Text>



            </HStack>
            <Box bgColor="violet.25" flex={1}>


                <AppDrawer></AppDrawer>


            </Box>
        </View>
    );
};


export default Logado;