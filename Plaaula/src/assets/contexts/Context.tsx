import React, { useEffect, useState } from 'react';

import Auth from '@react-native-firebase/auth'
export const UserContext = React.createContext({});

export function UserProvider({children}){
    const [usuario,setUsuario] = useState({});
    const [id,setId] = useState("");

 useEffect(() => {
    Auth().onAuthStateChanged(userLogado=>{
        setUsuario(userLogado);
    
        if(userLogado!=null){
        setId(userLogado.uid)
        }
     });
     //PegarUsuario(user);
  
  }, []);
    
    return(
        <UserContext.Provider value={{id}}>
            {children}
        </UserContext.Provider>

    )
}
