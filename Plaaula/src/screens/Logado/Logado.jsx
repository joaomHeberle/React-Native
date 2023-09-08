import * as React from "react";

import { Text, Button, IconButton, FlatList, Icon, View, NativeBaseProvider, Box, Center, VStack, HStack, Avatar, Heading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import AvatarImage from "../../Componentes/Avatar";
import { UserContext } from "../../assets/contexts/Context";
import { PegarNome } from "../../Banco/Consulta";
import { deleteAtividadeStorage } from "../../Banco/Delete";



function Logado({ navigation }) {
    const[nome,setNome]= React.useState("")
    const { id } = React.useContext(UserContext);
    const isFocused = useIsFocused();
      React.useEffect(() => { 
        async function fetchData() {
       
          
          setNome(await PegarNome(id));
        
        }
        fetchData();
      }, [id,isFocused]);
  


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
        return <Box flex={1}>
            <Heading style={{ textAlign: 'center' }} >Bem vindo(a) {nome.toUpperCase()}</Heading>

            <FlatList flex={1} mt={"1.5"} numColumns={3} data={icons} renderItem={({
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
                                   
                        <Text fontSize={"xl"}>{item.title}</Text>
                    </Center>
                </Box>
            }} />;
        </Box>
    }

    return (
        <View flex={1} bgColor="violet.26">
{console.log()}
            <HStack >

                <AvatarImage onTouchStart={() => navigation.navigate('ImagemPerfil')} ></AvatarImage>
                {/* <Avatar onTouchStart={() => navigation.navigate('ImagemPerfil')} size="lg" source={{ uri: image }} /> */}

                <Text alignItems="center" m="2" paddingLeft={"10"} fontSize={"3xl"} fontFamily="bold">Minhas Atividades</Text>



            </HStack>
            <Box bgColor="violet.25" flex={1}>


                <AppDrawer></AppDrawer>


            </Box>
        </View>
    );
};


export default Logado;