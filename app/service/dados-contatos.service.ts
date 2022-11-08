import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Guid } from 'guid-typescript'
import { Contato } from '../models/contato.model';


 
@Injectable({
  providedIn: 'root'
})
export class DadosContatosService {

  private contatos = [
    // {id: 1, nome:'Bruno', sobrenome:'Ferreira', tipo_tel:'celular', telefone: "9-1234-5678", email:'BrunoFerreira@gmail.com'},
    // {id: 2, nome:'Lucas', sobrenome:'Silva', tipo_tel:'celular', telefone: "9-8765-4321", email:'lucasSilva@gmail.com'}
 
  ]

  constructor(
    private storage : Storage
  ) { }

  inserir(argumento : Contato){
    

    argumento.id = Guid.create()

    this.storage.set(argumento.id.toString(), JSON.stringify(argumento))
  }


    //item 1
    recebeDados(enviarDadosId : Contato ){
      enviarDadosId.id = Guid.create()

      this.storage.set(enviarDadosId.id.toString(), JSON.stringify(enviarDadosId))

      // enviarDadosId.id = this.contatos.length + 1
      // this.contatos.push(enviarDadosId)
    }
  


  //item 2
    enviarTodosDados(){
    // return this.contatos
    let arrayContatos : Contato [] = []

    this.storage.forEach((valor : string) => {const contato : Contato = JSON.parse(valor); arrayContatos.push(contato)})
    return arrayContatos
  }

  async  enviarDadosId(id : string){
    // const contatoSelecionado = this.contatos.filter(contato => contato.id === id)
    // return contatoSelecionado[0]

     console.log( JSON.parse(await this.storage.get(id)))

     return JSON.parse(await this.storage.get(id))
  }



  deletaDados(enviarDadosId : any){
    this.contatos.splice(this.contatos.indexOf(enviarDadosId), 1)
  }

  async listarTodos(){
    let arrayPessoa: Contato [] = [];

    await this.storage.forEach((value: string) =>
    {const contato: Contato = JSON.parse(value); arrayPessoa.push(contato)})

    return arrayPessoa;
   
  } 
}
