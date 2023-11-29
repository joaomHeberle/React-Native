
import React from "react";
import * as yup from 'yup';

export const cadProfSchema = yup.object({
    nome: yup.string()
        .matches(/^[a-zA-ZÀ-ú]*[a-zA-ZÀ-ú][a-zA-ZÀ-ú ]*$/, "Nome deve conter apenas letras")
        .required("Digite um Nome")
        .min(2, "Nome deve ter no mínimo 2 caracteres")
        .max(30, "Nome deve ter no máximo 30 caracteres"),

    email: yup.string()
        .required("Digite um email valido")
        .email("digite um email valido"),

    senha: yup.string()
        .required("Digite uma senha")
        .min(8, "Senha deve ter no minimo 8 caracteres"),
});

export const altProfSchema = yup.object({
    nome: yup.string()
        .matches(/^[a-zA-ZÀ-ú]*[a-zA-ZÀ-ú][a-zA-ZÀ-ú ]*$/, "Nome deve conter apenas letras")
        .required("Digite um Nome")
        .min(2, "Nome deve ter no mínimo 2 caracteres")
        .max(30, "Nome deve ter no máximo 30 caracteres"),
});

export const homeSchema = yup.object({
     email: yup.string()
        .required("Digite um email válido")
        .email("digite um email válido"),
    senha: yup.string()
        .required("Digite uma senha")
        .min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export const RecSchema = yup.object({
    email: yup.string()
       .required("Digite um email válido")
       .email("digite um email válido"),
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
       titulo:yup.string()
       .matches(/^[a-zA-ZÀ-ú]*[a-zA-ZÀ-ú][a-zA-ZÀ-ú ]*$/, "Título deve conter apenas letras")
       .required("Digite um Título")
       .min(2, "Título deve ter no mínimo 2 caracteres")
       .max(30, "Título deve ter no máximo 30 caracteres"),
       metodologia:yup.string()
       .matches(/^[a-zA-ZÀ-ú ]+$/, "Metodologia deve conter apenas letras")
       .required("Descreva a Metodologia")
       .min(2, "Metodologia deve ter no mínimo 2 caracteres")
       });


export const CadDescricaoSchema = yup.object({
    duracao: yup.number()
       .required("Digite uma duração válida")
       .min(1,"Duração deve ser maior que 1 minuto")
       .max(60, "Duração deve ser menor que 60 minuto")
       .positive("Número precisa ser maior que 1")
       .integer("Deve ser um número inteiro")
       .typeError("Duração deve ser um número"),
       titulo:yup.string()
       .matches(/^[a-zA-ZÀ-ú]*[a-zA-ZÀ-ú][a-zA-ZÀ-ú ]*$/, "Título deve conter apenas letras")
       .required("Digite um Título")
       .min(2, "Título deve ter no mínimo 2 caracteres")
       .max(30, "Título deve ter no máximo 30 caracteres"),
       metodologia:yup.string()
       .matches(/^[a-zA-ZÀ-ú ]+$/, "Metodologia deve conter apenas letras")
       .required("Descreva a Metodologia")
       .min(2, "Metodologia deve ter no mínimo 2 caracteres")
       });

       export const DeletaContaSchema = yup.object({
        senha: yup.string()
        .required("Digite sua senha de acesso")
        .min(8, "Senha deve ter no mínimo 8 caracteres"),
});
          
        