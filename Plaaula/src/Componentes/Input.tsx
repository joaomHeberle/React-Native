import { Input as InputBase, IInputProps, FormControl as FormBase, IFormControlProps } from "native-base";
import { border } from "native-base/lib/typescript/theme/styled-system";
import React from "react";
import { FormLabel } from "./FormLabel";
type Props = IFormControlProps & {
    title: string;
}
type PropsInput = IInputProps & {
    title: string;
    requerido: boolean;
    errorMessage: string;
}

export function Input(
    { errorMessage = null, title, isInvalid, requerido, ...restInput }: PropsInput,
    { ...restControl }: Props,

) {

    const invalid = !!errorMessage || isInvalid;

    return (
        <FormBase isRequired={requerido} isInvalid={invalid}>
            <FormLabel>{title}</FormLabel>
            <InputBase
                isInvalid={invalid}
                fontSize="md"
                mx="3"
                variant="unstyled"
                {...restInput}
                shadow="3"
                borderRadius={50}
                borderY="80"
                color="violet.26"

                paddingLeft='3.5'
                _invalid={{
                    borderWidth: 2,
                    borderColor: 'red.500',

                }


                }
            />
        
            <FormBase.ErrorMessage fontSize="8xl"   paddingLeft='3.5'>
                {errorMessage

                }

            </FormBase.ErrorMessage>
        </FormBase>
    )


}