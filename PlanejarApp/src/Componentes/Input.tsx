import { Input as InputBase, IInputProps} from "native-base";
import React from "react";

export function Input({...rest}: IInputProps){
    return (
   
        <InputBase 
        bg={"blue.200"}
        fontSize="md"
        // h={10}
        // my="3"
        mx="3"
        borderRadius={2}
        borderWidth={1}
        borderColor="blue.400"
        {...rest}
      
        />
   
    )
}