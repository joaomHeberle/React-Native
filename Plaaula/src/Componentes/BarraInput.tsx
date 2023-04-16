import { Progress, Center } from "native-base";


export default function BarraInput({...restInput}) {

    return(
        <Center>
            
<Progress width={"3/4"}marginTop={"2"} colorScheme="emerald" {...restInput}></Progress>
</Center> )
}