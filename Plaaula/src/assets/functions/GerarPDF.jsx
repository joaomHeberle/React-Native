import * as React from "react";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default async function GerarPDF(html){
 
  // const file = await printToFileAsync({
  //   html: html,
  //   base64: false
  // });

  // await shareAsync(file.uri);


  const { uri } = await Print.printToFileAsync({ html });
 
  await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
  .then(()=>{
    console.log('Pdf salvo em:', uri)})
  .catch((error) => {
  console.log(error)

      })
    }