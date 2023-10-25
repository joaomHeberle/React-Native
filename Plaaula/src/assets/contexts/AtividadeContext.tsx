import React, { useState } from 'react';

export const AtivContext = React.createContext({});

export function AtividadeProvider({children}){

    const [atividade,setAtividade] = useState({
        ID: "route.params.ID",
        titulo: "route.params.titulo",
        isPublic: "route.params.isPublic",
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
