import React, { useState } from 'react';

import Auth from '@react-native-firebase/auth'
export const AtivContext = React.createContext({});

export function AtividadeProvider({children}){
 
    const [atividade,setAtividade] = useState({
        ID: "uuid.v4()",
        titulo: "route.params.titulo",
        isPublic: "true",
        foto: "url",
        metodologia: "route.params.metodologia",
        componente: "route.params.componente",
        ano: "route.params.ano",
        objetosConhecimento: "route.params.objetosConhecimento",
        habilidades:"route.params.habilidades",
        createdAt: "new Date()",
        duracao:"route.params.duracao"

    });


//  useEffect(() => {
//     Auth().onAuthStateChanged(userLogado=>{
//         setUsuario(userLogado);
    
//         if(userLogado!=null){
//         setId(userLogado.uid)
//         }
//      });
   
  
//   }, []);
    
    return(
        <AtivContext.Provider value={{atividade,setAtividade}}>

            {children}
        </AtivContext.Provider>

    )
}
