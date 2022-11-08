import { Guid } from "guid-typescript";

export interface Contato {
    id: Guid,
    nome: string,
    sobrenome: string,
    telefone : string,
    email : string,
    tipo_tel : string 
}