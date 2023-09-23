
import React from "react";
import * as yup from 'yup';


// export const cadAulaBncc= yup.object({
//     descr: yup.string()
//     .min(2,"Ano deve ter no minimo 2 caracteres")
//     .max(3,"Ano deve ter no maximo 3 caracteres"),


// })
export const cadProfSchema = yup.object({
    nome: yup.string()
        //.matches(/[^a-zA-Z\wÀ-ú ]/g, "Nome deve conter apenas letras")
        .required("Digite um Nome")
        .min(2, "Nome deve ter no minino 2 caracteres")
        .max(30, "Nome deve ter no maxino 30 caracteres"),

    email: yup.string()
        .required("Digite um email valido")
        .email("digite um email valido"),
    senha: yup.string()
        .required("Digite uma senha")
        .min(8, "Senha deve ter no minino 8 caracteres"),

});
export const altProfSchema = yup.object({
    nome: yup.string()
        .matches(/^[a-zA-ZÀ-ú ]+$/, "Nome deve conter apenas letras")
        .required("Digite um Nome")
        .min(2, "Nome deve ter no minino 2 caracteres")
        .max(30, "Nome deve ter no maxino 30 caracteres"),

});
export const homeSchema = yup.object({
     email: yup.string()
        .required("Digite um email valido")
        .email("digite um email valido"),
    senha: yup.string()
        .required("Digite uma senha")
        .min(8, "Senha deve ter no minino 8 caracteres"),

});
export const RecSchema = yup.object({
    email: yup.string()
       .required("Digite um email valido")
       .email("digite um email valido"),
 

});
export const cadAulaBnccSchema = yup.object({
    Ano: yup.string()
       .required("Escolha uma opção"),
   Componente: yup.string()
   .required("Escolha uma opção"),
   Objeto: yup.string()
   .required("Escolha uma opção")
   .min(1,"Escolha uma opção"),
   Habilidade:yup.string()
   .required("Escolha uma opção")
   .min(1,"Escolha uma opção"),

});
export const altAulaSchema = yup.object({
   duracao: yup.string()
       .required("Escolha uma opção"),


});

export const CadDescricaoSchema = yup.object({
    duracao: yup.number()
       .required("Digite uma duração valida")
       .min(1,"Duração deve ser maior que 1 minuto")
       .max(60, "Duração deve ser menor que 60 minuto")
       .positive("Numero precisa ser maior que 1")
       .integer("Deve ser um numero inteiro")
       .typeError("Duração deve ser um numero")
       


});
export const AltDescricaoSchema = yup.object({
    duracao:  yup.string()
    .matches(/^[1-9]|[1-5][0-9]|60$/, 'Digite um número válido de 1 a 60')
    .required("Digite uma duração valida")
       


});