import { Center,Avatar  } from "native-base";
import * as React from "react";
import { BlankImage } from "../assets/imgUri/BlankImage";
import { PegarFoto } from "../Banco/Consulta";
import { UserContext } from "../assets/contexts/Context";
import { useIsFocused,useNavigation } from '@react-navigation/native';

export default function AvatarImage({...restInput}) {
    const navigation = useNavigation();
    const ImgData= BlankImage
    const [image, setImage] = React.useState(ImgData);
    const { id } = React.useContext(UserContext);
    const isFocused = useIsFocused();
    const pegaFoto=async ()=>{

        setImage(await PegarFoto(id));


}
React.useEffect(() => {
 
    pegaFoto();

 
},[isFocused]);


    return(
        <Center>
            
            <Avatar {...restInput} size="lg" source={{ uri: image }} />
            {/* <Button onPress={pegaFoto}>ver foto</Button> */}
            </Center> )
}