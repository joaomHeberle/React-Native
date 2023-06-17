import React, { useState } from 'react';

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


    
    return(
        <AtivContext.Provider value={{atividade,setAtividade}}>

            {children}
        </AtivContext.Provider>

    )
}
