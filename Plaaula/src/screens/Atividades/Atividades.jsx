import * as React from "react";
import {VStack,Box,Divider } from "native-base";
import {ListAtividade} from "../../Componentes/ListAtividade";
import CadAula from "../CadAula/CadAulaImagem";


function Atividades() {
    return (  
        <Box flex={1} bgColor="violet.25">

            <ListAtividade></ListAtividade>
        
    
      
        </Box>
    );
}

export default Atividades;