import * as React from "react";
import { View, Box, CheckIcon, Text, Image, Select, ScrollView, Center, Button, Divider, Popover, HStack, Modal, VStack, Radio, Switch } from "native-base";
import { useRoute } from "@react-navigation/native";
import {

  SafeAreaView,
  TouchableOpacity,

} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { AtivContext } from "../../assets/contexts/AtividadeContext";
import { busca } from "../../Banco/Consulta";
import { UserContext } from "../../assets/contexts/Context";
import { yupResolver } from "@hookform/resolvers/yup";
import { CadDescricaoSchema, altAulaSchema } from "../../assets/ValidacaoSchema";
import { Input } from "../../Componentes/Input";
import { TextArea } from "../../Componentes/TextArea";
import UpdateAtividade from "../../Banco/Update";
import DeleteAtividade, { deleteAtividadeStorage } from "../../Banco/Delete";
import GerarPDF from "../../assets/functions/GerarPDF";

export default function MeuDetalhe({ navigation }) {


 
  const route = useRoute();
  const [imagem, setImagem] = React.useState();
  const ativDado = React.useContext(AtivContext)
  const { id } = React.useContext(UserContext);
  const [isOpenDel, setIsOpenDel] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const numeros = Array.from({ length: 60 }, (_, index) => index + 1);
  const flag=ativDado.atividade.isPublic
  console.log(ativDado.atividade.isPublic)
  const [isPublic, setIsPublic] = React.useState(flag);
 

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(altAulaSchema),
    defaultValues: {
      duracao: ativDado.atividade.duracao,
      isPublic:ativDado.atividade.isPublic
    },
  });
  
  const imprimirPDF = () => {
    GerarPDF(html);
  }
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Tabela</title>
  </head>
  <body>
      <table border="1">
      <caption style="font-size: 24pt; font-weight: bold;">Plano de aula</caption>
          <tr>
              <td  style="font-size: 22pt;">Titulo</td>
              <td ">${ativDado.atividade.titulo}</td> 
          </tr>
          <tr>
              <td style="font-size: 22pt;">Duração</td>
              <td>${ativDado.atividade.duracao}</td> 
          </tr>
          <tr>
              <td style="font-size: 22pt;">Metodologia</td>
              <td>${ativDado.atividade.metodologia}</td> 
          </tr>
          <tr>
              <td style="font-size: 22pt;">Ano</td>
              <td>${ativDado.atividade.ano}</td> 
          </tr>
          <tr>
              <td style="font-size: 22pt;">Componente Curricular</td>
              <td>${ativDado.atividade.componente}</td> 
          </tr>
          <tr>
              <td style="font-size: 22pt;">Objetos de conhecimento</td>
              <td>${ativDado.atividade.objetosConhecimento}</td> 
          </tr>
          <tr>
          <td style="font-size: 22pt;">Habilidade</td>
          <td>${ativDado.atividade.habilidades}</td> 
      </tr>
  </table>
</body>
</html>
  
  
`;
const togglePublication = () => {
  setIsPublic(!isPublic);
 
};
  const imprimiAtt = (dado) => {

    if (dado.metodologia === undefined && dado.titulo === undefined) {
      dado.metodologia = ativDado.atividade.metodologia
      dado.titulo = ativDado.atividade.titulo
      console.log(dado.metodologia + dado.titulo)
    } else if (dado.titulo === undefined) {
      console.log("sem titulo")


    } else if (dado.metodologia === undefined) {
      console.log("sem metodologia")


    } else {

      console.log(dado)
    }



  }

  const handleAtt = (dado) => {
console.log(dado)
    // if (dado.metodologia === undefined && dado.titulo === undefined) {
    //   dado.metodologia = ativDado.atividade.metodologia
    //   dado.titulo = ativDado.atividade.titulo

    // } else if (dado.titulo === undefined) {
    //   dado.titulo = ativDado.atividade.titulo



    // } else if (dado.metodologia === undefined) {
    //   dado.metodologia = ativDado.atividade.metodologia

    // }
    // dado.duracao = parseInt(dado.duracao)
    // console.log(dado)
   

    // UpdateAtividade(ativDado.atividade.ID,dado)
    // ativDado.setAtividade({
    //   titulo: dado.titulo,
    //   ID:ativDado.atividade.ID,
    //   isPublic: dado.isPublic,
    //   foto: imagem,
    //   metodologia: dado.metodologia,
    //   componente: ativDado.atividade.componente,
    //   ano: ativDado.atividade.ano,
    //   objetosConhecimento: ativDado.atividade.objetosConhecimento,
    //   habilidades: ativDado.atividade.habilidades,
    //   criadoEm: ativDado.atividade.criadoEm,
    //   duracao: dado.duracao
    // })
    setShowModal(false);

  }
  const deleta = () => {
    DeleteAtividade(ativDado.atividade.ID, id)
    navigation.navigate('Logado')
  }

  React.useEffect(() => {
    setImagem(ativDado.atividade.foto);

  }, []);

  return (
    <SafeAreaView bgColor="violet.25" style={{ flex: 1 }}>
      <Box w="100%" alignItems="center" bgColor="violet.26">
        <HStack >



          {/* Modal */}
          <Center>
            <Button size={"lg"} m={2} colorScheme="emerald" onPress={() => setShowModal(true)}>Atualizar</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
              <Modal.Content maxWidth="350">
                <Modal.CloseButton />
                <Modal.Header>Atualizar</Modal.Header>
                <Modal.Body>
                  <Center>
                    <Controller control={control}
                      name="titulo"
                      render={({ field: { onChange } }) => (
                        <Input
                          isRequired={true}
                          autoCapitalize='words'
                          autoComplete='off'
                          returnKeyType='done'
                          requerido={true}
                          title="Titulo"
                          onChangeText={onChange}
                          errorMessage={errors.titulo?.message}
                          defaultValue={ativDado.atividade.titulo}
                        />
                      )}
                    />
                    <Center>
                      <Controller control={control}
                        name="duracao"


                        render={({ field: { onChange } }) => (
                          <VStack marginTop={'1/6'}>
                            <Text style={{ marginLeft: 10 }}>Selecione uma duração para alterar:</Text>
                            <Select minWidth="200" accessibilityLabel="Escolha uma duração"
                              placeholder="Escolha uma duração" onValueChange={(value) => {
                                onChange(value);

                              }}

                              style={{ height: 40, marginLeft: 10 }}
                              _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={2} />
                              }} mt="1" isInvalid={!!errors.Ano}>
                              {numeros.map((numero) => {
                                return <Select.Item
                              
                                  onChangeText={onChange}
                                  label={numero.toString()}
                                  value={numero}
                                  key={numero}

                                />
                              })}
                            </Select>

                            <Center>
                            <Text>Duração da atividade: {ativDado.atividade.duracao} Min</Text>
                              {errors && <Text color={"red.500"}>{errors.Ano?.message}</Text>}
                            </Center>

                          </VStack>
                        )}
                      >


                      </Controller>

                    </Center>

                    <Controller control={control}
                      name="metodologia"
                      render={({ field: { onChange } }) => (
                        <TextArea
                          keyboardType='name-phone-pad'
                          autoCapitalize='words'
                          autoComplete='off'
                          returnKeyType='done'
                          title="Metodologia"
                          paddingX="10"
                          onChangeText={onChange}
                          requerido={true}
                          errorMessage={errors.metodologia?.message}
                          defaultValue={ativDado.atividade.metodologia}
                        />
                      )}
                    />
<Text fontSize={'2xl'}></Text>
<Controller control={control}
  name="isPublic"
  render={({ field}) => (
      <Button 
      backgroundColor={field.value ? 'green.500' : 'red.500'} 
      onPress={()=>{field.onChange(!field.value)}}>
        {field.value ?  'Público':'Privado'        }
        </Button>
      )}
                 />
                  </Center>
                </Modal.Body>
                <Modal.Footer>
                  <Button flex="1" onPress={() => {
                    setShowModal(false);
                  }}>
                    Cancelar
                  </Button>
                  {/* <Button flex="1" onPress={() => {
             setShowModal2(true);
          }}>
              Continuar
            </Button> */}
                  <Button flex="1"
                 
                    onPress={handleSubmit(handleAtt)}
                  >
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
              <Popover.CloseButton onPress={() => setIsOpenDel(false)} />
              <Popover.Header>Deletar Atividade</Popover.Header>
              <Popover.Body >
                Você tem certeza que quer deletar esta atividade ?
                Após a exclusão é impossivel recuperar a atividade.
              </Popover.Body>
              <Popover.Footer justifyContent="flex-end">

                <Button.Group space={2}>
                  <Button onPress={() => setIsOpenDel(false)} colorScheme="coolGray" variant="ghost">
                    cancelar
                  </Button>
                  <Button onPress={() => {
                    //console.log(id)
                    deleta()
                  }
                  }
                    colorScheme="danger">Deletar</Button>
                </Button.Group>
              </Popover.Footer>
            </Popover.Content>
          </Popover>


          <Button size={"lg"} m={2} onPress={imprimirPDF} colorScheme="cyan">Imprimir</Button>

        </HStack>
      </Box>


      <View flex={1} bgColor="violet.25">

        <ScrollView>
          <Box marginBottom={"1.5"} marginRight={"1"}>
            <Text color={"cadastrar.1"} ml={5} my={30} textAlign='center' fontSize={"4xl"}
              fontFamily="bold">

              Componente: {ativDado.atividade.componente}
            </Text>
            <Divider backgroundColor={"amber.900"} />

            <Center>
              {imagem && <TouchableOpacity onPress={() => navigation.navigate('ImprimirImagem', { img: imagem })}><Image width={'32'} height={'32'} alt='foto' source={{ uri: imagem }} />
              </TouchableOpacity>}
            </Center>
            
            <Divider backgroundColor={"amber.900"} />
            
            <View flex={1} bgColor="purple.100">
            <Divider backgroundColor={"amber.900"} />
          
            {ativDado.atividade.isPublic ?<Text  ml={5} fontSize={"2xl"}
                fontFamily="bold">
                 Publico
               
              </Text>
         
              :
           
              <Text ml={5} fontSize={"2xl"}
                fontFamily="bold">
                 Privado
               
              </Text>
              
              }
          
              <Divider backgroundColor={"amber.900"} />
             
              <Text ml={5} fontSize={"5xl"}
                fontFamily="bold">
                Titulo:
              </Text>
              <Text my={30} ml={5} fontSize={"4xl"}
                fontFamily="bold">
                {ativDado.atividade.titulo}
              </Text>
              <Divider backgroundColor={"amber.900"} />
              <Text ml={5} fontSize={"5xl"}
                fontFamily="bold">
                Ano:
              </Text>
              <Text my={30} ml={5} fontSize={"4xl"}
                fontFamily="bold">
                {ativDado.atividade.ano}
              </Text>
              <Divider backgroundColor={"amber.900"} />
              <Text ml={5} fontSize={"5xl"}
                fontFamily="bold">
                Objetos de conhecimentos:
              </Text>
              <Text my={30} ml={5} fontSize={"4xl"}
                fontFamily="bold">
                {ativDado.atividade.objetosConhecimento}
              </Text>
              <Divider backgroundColor={"amber.900"} />

              <Text ml={5} fontSize={"5xl"}
                fontFamily="bold">
                Habilidade:
              </Text>
              <Text my={30} ml={5} fontSize={"4xl"}
                fontFamily="bold">
                {ativDado.atividade.habilidades}

              </Text>
              <Divider backgroundColor={"amber.900"} />
              <Text ml={5} fontSize={"5xl"}
                fontFamily="bold">
                Duração:
              </Text>
              <Text my={30} ml={5} fontSize={"4xl"}
                fontFamily="bold">
                {ativDado.atividade.duracao}

              </Text>
              <Divider backgroundColor={"amber.900"} />
              <Text ml={5} fontSize={"5xl"}
                fontFamily="bold">
                Metodologia:
              </Text>
              <Text my={30} ml={5} fontSize={"4xl"}
                fontFamily="bold">
                {ativDado.atividade.metodologia}

              </Text>

            </View>
          </Box>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
