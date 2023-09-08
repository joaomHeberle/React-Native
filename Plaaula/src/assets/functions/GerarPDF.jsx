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

    export async function gerarImg(html){
      const htmlContent = `
      <html>
        <head>
          <style>
            @page {
              width: 210mm;
    height: 297mm;
    margin: 0; 
            }
            body {
              margin: 0; 
            }
           
          </style>
        </head>
        <body>
       
          <img src=${html} style="width: 100%; height: auto;" />
        </body>
      </html>
    `;
  
    try {
      const { uri } = await Print.printAsync({
        html: htmlContent,
      });
      console.log(`Documento de impressão gerado em: ${uri}`);
    } catch (error) {
      console.error('Erro ao imprimir:', error);
    }
    }