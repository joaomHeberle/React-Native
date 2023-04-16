
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
export const homeSchema = yup.object({
     email: yup.string()
        .required("Digite um email valido")
        .email("digite um email valido"),
    senha: yup.string()
        .required("Digite uma senha")
        .min(8, "Senha deve ter no minino 8 caracteres"),

});
export const cadAulaBnccSchema = yup.object({
    Ano: yup.string()
       .required("Escolha uma opção"),
   Componente: yup.string()
   .required("Escolha uma opção"),
   Objeto: yup.string()
   .required("Escolha uma opção")
   .min(1,"Escolha uma opção"),

});
export const CadDescricaoSchema = yup.object({
    duracao: yup.number()
       .required("Digite uma duração valida")
       .min(1,"Duração deve ser maior que 1 minuto")
       .max(60, "Duração deve ser menor que 60 minuto")
       .positive()
       .integer()
       ,
//    senha: yup.string()
//        .required("Digite uma senha")
//        .min(8, "Senha deve ter no minino 8 caracteres"),

});
