import * as React from "react";
import {View, Box, Text,Image, ScrollView, Center, Button,Divider, Popover, HStack, Modal, VStack, Radio } from "native-base";
import { useRoute } from "@react-navigation/native";
import {

    Pressable,
    SafeAreaView,

  } from 'react-native';
  
import { AtivContext } from "../../assets/contexts/AtividadeContext";
import { busca } from "../../Banco/Consulta";
import { UserContext } from "../../assets/contexts/Context";

export default function MeuDetalhe(){
    const route = useRoute();
    const [imagem, setImagem] = React.useState();
    const ativDado = React.useContext(AtivContext)
    const { id } = React.useContext(UserContext);
    const [isOpenDel, setIsOpenDel] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const [showModal3, setShowModal3] = React.useState(false);

    React.useEffect(() => {
        setImagem(ativDado.atividade.foto);
    
    }, []);

    return (
        <SafeAreaView bgColor="violet.25" style={{ flex: 1 }}>
<Box w="100%" alignItems="center" bgColor="violet.26">
    <HStack >


           {/* Modal */}
      <Center>
      <Button  size={"lg"} m={2} colorScheme="emerald" onPress={() => setShowModal(true)}>Atualziar</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Order</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Sub Total</Text>
                <Text color="blueGray.400">$298.77</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Tax</Text>
                <Text color="blueGray.400">$38.84</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total Amount</Text>
                <Text color="green.500">$337.61</Text>
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {
            setShowModal(false);
          }}>
              Cancelar
            </Button>
            <Button flex="1" onPress={() => {
             setShowModal2(true);
          }}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Select Address</Modal.Header>
          <Modal.Body>
            <Radio.Group defaultValue="address1" name="address" size="sm">
              <VStack space={3}>
                <Radio alignItems="flex-start" _text={{
                mt: "-1",
                ml: "2",
                fontSize: "sm"
              }} value="address1">
                  4140 Parker Rd. Allentown, New Mexico 31134
                </Radio>
                <Radio alignItems="flex-start" _text={{
                mt: "-1",
                ml: "2",
                fontSize: "sm"
              }} value="address2">
                  6391 Elign St. Celina, Delaware 10299
                </Radio>
              </VStack>
            </Radio.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {
            setShowModal3(true);
          }}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModal3} size="lg" onClose={() => setShowModal3(false)}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Payment Options</Modal.Header>
          <Modal.Body>
            <Radio.Group name="payment" size="sm">
              <VStack space={3}>
                <Radio alignItems="flex-start" _text={{
                mt: "-1",
                ml: "2",
                fontSize: "sm"
              }} value="payment1">
                  Cash on delivery
                </Radio>
                <Radio alignItems="flex-start" _text={{
                mt: "-1",
                ml: "2",
                fontSize: "sm"
              }} value="payment2">
                  Credit/ Debit/ ATM Card
                </Radio>
                <Radio alignItems="flex-start" _text={{
                mt: "-1",
                ml: "2",
                fontSize: "sm"
              }} value="payment3">
                  UPI
                </Radio>
              </VStack>
            </Radio.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {
            setShowModal(false);
            setShowModal2(false);
            setShowModal3(false);
          }}>
              Checkout
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>





      <Popover placement="bottom left" trigger={triggerProps => {
      return <Button m={2} size={"lg"} colorScheme="danger" alignSelf="center" {...triggerProps} onPress={() => setIsOpenDel(true)}>
      Deletar
    </Button>
}} isOpen={isOpenDel} onClose={() => setIsOpen(!isOpenDel)}>
        <Popover.Content accessibilityLabel="Delete Customerd" w="56">
          <Popover.Arrow />
          <Popover.CloseButton  onPress={() => setIsOpenDel(false)}/>
          <Popover.Header>Deletar Atividade</Popover.Header>
          <Popover.Body>
            Você tem certeza que quer deletar esta atividade ?
            Após deletar é impossivel recuperar a atividade.
           </Popover.Body>
          <Popover.Footer justifyContent="flex-end">
     
            <Button.Group space={2}>
              <Button onPress={() => setIsOpenDel(false)} colorScheme="coolGray" variant="ghost">
cancelar
              </Button>
              <Button colorScheme="danger">Deletar</Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>



   
      </HStack>
    </Box>



<View flex={1} bgColor="violet.25">
  
    <ScrollView>
        <Box  marginBottom={"1.5"} marginRight={"1"}>
        <Text color={"cadastrar.1"} ml={5} my={30} textAlign='center' fontSize={"4xl"}
    fontFamily="bold">
       
        Componente: {ativDado.atividade.componente}
</Text>
<Divider backgroundColor={"amber.900"}/>

    <Center>
         {imagem && <Image width={'32'} height={'32'} alt='foto' source={{ uri: imagem }} 
                />}
</Center>
<Divider backgroundColor={"amber.900"}/>
 <View flex={1} bgColor="purple.100">
 <Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
       Titulo: 
        </Text>
<Text my={30}  ml={5}  fontSize={"4xl"}
    fontFamily="bold">
   {ativDado.atividade.titulo}
</Text>
<Divider backgroundColor={"amber.900"}/>
<Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
        Ano: 
        </Text>
<Text my={30} ml={5}  fontSize={"4xl"}
    fontFamily="bold">
      {ativDado.atividade.ano}
</Text>
<Divider backgroundColor={"amber.900"}/>
<Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
        Objetos de conhecimentos: 
        </Text>
<Text my={30} ml={5}  fontSize={"4xl"}
    fontFamily="bold">
      {ativDado.atividade.objetosConhecimento}
</Text>
<Divider backgroundColor={"amber.900"}/>

<Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
       Habilidade:
        </Text>
<Text my={30} ml={5} fontSize={"4xl"}
    fontFamily="bold">
       {ativDado.atividade.habilidades}
        
</Text>
<Divider backgroundColor={"amber.900"}/>
<Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
       Duração:
        </Text>
<Text my={30} ml={5} fontSize={"4xl"}
    fontFamily="bold">
       {ativDado.atividade.duracao}
        
</Text>
<Divider backgroundColor={"amber.900"}/>
<Text ml={5} fontSize={"5xl"}
    fontFamily="bold">
       Metodologia:
        </Text>
<Text my={30} ml={5} fontSize={"4xl"}
    fontFamily="bold">
       {ativDado.atividade.metodologia}
        
</Text>
{console.log(ativDado)}
</View>
</Box>
</ScrollView>
</View>
</SafeAreaView>
    )
}
