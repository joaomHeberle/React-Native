
import React from "react";
import * as yup from 'yup';



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


