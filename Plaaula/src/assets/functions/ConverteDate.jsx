export default function converteDate(item){
  
//  console.log(item)

  if(item.seconds){
    const timestamp = item.seconds
  
    const date= new Date(timestamp*1000)
    const ano = date.getFullYear();
    const mes = date.getMonth() + 1;
    const dia = date.getDate();
    const fullDate= dia+"/"+mes+"/"+ano
    return fullDate 
  
  }else{
    return "00/00/0000"
  }

  
 
  }