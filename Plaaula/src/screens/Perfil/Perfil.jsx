import * as React from "react";
import * as base from "native-base";
import { sair } from "../../Banco/Auth";
import { UserContext } from "../../assets/contexts/Context";
import * as IMAGEPICKER from 'expo-image-picker'
import AvatarImage from "../../Componentes/Avatar";
import { PegarNome } from "../../Banco/Consulta";
import { Entypo } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { deletarConta } from "../../Banco/Delete";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeletaContaSchema } from "../../assets/ValidacaoSchema";
import { Input } from "../../Componentes/Input";

function Perfil({ navigation }) {
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(DeletaContaSchema),
     
      });
    const [nome, setNome] = React.useState("")
    const [isOpenDel, setIsOpenDel] = React.useState(false);
    const { id } = React.useContext(UserContext);
    const imgData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/" +
        "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";
        const isFocused = useIsFocused();

    function update() {


        console.log("oi")
    }


    const pickImage = async () => {
        let result = await IMAGEPICKER.launchImageLibraryAsync({
            mediaTypes: IMAGEPICKER.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);

        } else {
            setImage(imgData)
        }

    },
     [image, setImage] = React.useState(imgData),
    signOut = () => {
        sair({ navigation });
        navigation.navigate('Home')
    }, deletar =(dado) =>{
// console.log(dado.senha)
           deletarConta(dado.senha,id,{ navigation })
          
    }
    
    React.useEffect(() => {
        async function fetchData() {

            setNome(await PegarNome(id));
            // Save the fetched nome to state here
        }
        fetchData();
    }, [id,isFocused]);
    return (
        <base.View flex={1} bgColor="violet.26">

            <base.VStack textAlign='center'>
                <base.Box>

                    <base.Center>
                        <base.Text style="text-align: center;" alignItems="center" fontSize="4xl" fontFamily="bold">
                            Perfil
                        </base.Text>
                    </base.Center>

                </base.Box>

            </base.VStack>

            <base.Box bgColor='violet.25' flex={1}>
                <base.VStack mt={'1/2'}>

                    <AvatarImage onTouchStart={() => navigation.navigate('ImagemPerfil')} >
                     
                    </AvatarImage>
                    <base.Heading fontSize={"5xl"}
                        style={{ textAlign: 'center' }}>{nome.toUpperCase()}
                    </base.Heading>

                    <base.IconButton onPress={() => navigation.navigate('EditarNome')} icon={<base.Icon as={Entypo} name="pencil" />} borderRadius="full" _icon={{
                        color: "black",
                        size: "2xl"
                    }} _hover={{
                        bg: "green.600:alpha.20"
                    }} _pressed={{
                        bg: "green.600:alpha.20",
                        _icon: {
                            name: "emoji-flirt"
                        },
                        _ios: {
                            _icon: {
                                size: "3xl"
                            }
                        }
                    }} _ios={{
                        _icon: {
                            size: "3xl"
                        }
                    }} />



                </base.VStack>
                <base.Button  onPress={signOut} rounded='md' bg={'cadastrar.1'} fontFamily="choco" mt='100' mx={'3'} >
                        <base.Text>Sair</base.Text>
                    </base.Button >

                    <base.Popover placement="bottom left" trigger={triggerProps => {
            return <base.Button m={2} size={"lg"} colorScheme="danger" alignSelf="center" {...triggerProps} onPress={() => setIsOpenDel(true)}>
              Deletar Conta
            </base.Button>
          }} isOpen={isOpenDel} onClose={() => setIsOpenDel(!isOpenDel)}>
            <base.Popover.Content accessibilityLabel="Delete Customerd" w="56">
              <base.Popover.Arrow />
              <base.Popover.CloseButton onPress={() => setIsOpenDel(false)} />
              <base.Popover.Header>Deletar Conta</base.Popover.Header>
              <base.Popover.Body >
                Você tem certeza que quer deletar sua conta ?
                Após a exclusão é impossivel recuperar sua conta e atividades criadas.
                <base.Center>
                    <Controller control={control}
                      name="senha"
                      render={({ field: { onChange } }) => (
                        <Input
                        type="password"
                          isRequired={true}
                          autoCapitalize='words'
                          autoComplete='off'
                          returnKeyType='done'
                          requerido={true}
                          title="Senha da conta"
                          onChangeText={onChange}
                          errorMessage={errors.senha?.message}
                          
                        />
                      )}
                    />
                    </base.Center>
              </base.Popover.Body>
              <base.Popover.Footer justifyContent="flex-end">

                <base.Button.Group space={2}>
                  <base.Button onPress={() => setIsOpenDel(false)} colorScheme="coolGray" variant="ghost">
                    cancelar
                  </base.Button>
                  <base.Button onPress={
                    handleSubmit(deletar)
                  
                  }
                    colorScheme="danger">Deletar</base.Button>
                </base.Button.Group>
              </base.Popover.Footer>
            </base.Popover.Content>
          </base.Popover>
            
            </base.Box>
     

        </base.View>
    );
}

export default Perfil;