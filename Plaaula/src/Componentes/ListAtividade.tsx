import { Box, Center,Text, FlatList,  SectionList} from "native-base";
import { useEffect, useState } from "react";
import test from "../Banco/test.json"
import groupBy from "lodash/groupBy"
import _ from "lodash";
import {

    SafeAreaView,

  } from 'react-native';
const listaAtividades =test;



export function ListAtividade() {

    const [atividade,setAtividade] = useState([]);

    const groupedList=_.chain(listaAtividades)
        .groupBy('Componente')
        .sortBy('titulo')    
        .value();
        
        
    

    function listar(){
        var Ati=[];
        groupedList.map((disciplina)=>{
        
            let section = {
                horizontal:true,
                title:disciplina[0].Componente,
                data:[...disciplina]
            };
            Ati.push(section);
        })
      
    setAtividade(Ati)}

    useEffect(()=>{
       listar();
    },[]
    );

 
function renderAti(item){

return <Box bg={'amber.100'} marginBottom={"1.5"} marginRight={"1"}>
<Center>
<Text>{item.foto}</Text>
<Text> Titulo: {item.titulo}



</Text>

<Text>Descrição:{item.descricao}</Text>
</Center>

</Box>

    

}

function sectionRenderAti(title)
{
return <Center>
    {
    <Text color={"cadastrar.1"} fontSize="3xl">
        {title}
    </Text>
    }
    </Center>
    }

   
    return (
        <SafeAreaView style={{ flex: 1 }}>

         {/* <Center h="80" w="100%">
         <SectionList maxW="300" w="100%" mb="4" sections={atividade}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => renderAti(item)

            }
            renderSectionHeader={({ section: {
                title
            } }) => sectionRenderAti(title)
        }

        />
            </Center> */}
        <Center w="100%">
        <SectionList
         maxW="300" 
         w="100%" 
         mb="4" 
         contentContainerStyle={{ paddingHorizontal: 10 }}
         sections={atividade}
            keyExtractor={(item) => String(item.id)}
            renderSectionHeader={({ section})=> (
                <>
                {sectionRenderAti(section.title)}
                {section.horizontal ? (
                    <FlatList
                      horizontal
                      data={section.data.slice(0,3)}
                      renderItem={({ item }) =>renderAti(item)}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : null}
                </>
                ) }
  


            renderItem={({ item,section }) =>{
                if (section.horizontal) {
                    return null;
                  }else{
                   return renderAti(item)

                  }

            }

            }
     

        />


    </Center>
    </SafeAreaView>
    );
}
