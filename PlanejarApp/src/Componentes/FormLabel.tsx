import {FormControl as FormBase, IFormControlProps } from 'native-base';

import React from "react";

export function FormLabel({...rest}: IFormControlProps){

    return (
      
            <FormBase.Label
            fontSize="md"
            mt="3"
            mx="3"
            {...rest}
            _text={{
        bold: true

      }}>

      </FormBase.Label>
    
    )
}