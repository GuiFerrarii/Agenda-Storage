import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DadosContatosService } from 'src/app/service/dados-contatos.service';
import { AlertController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Guid } from 'guid-typescript';
import { Contato } from 'src/app/models/contato.model';







@Component({
  selector: 'app-detalhes-contatos',
  templateUrl: './detalhes-contatos.page.html',
  styleUrls: ['./detalhes-contatos.page.scss'],
})
export class DetalhesContatosPage implements OnInit {
  cliente={}
  clienteForm : FormGroup
  id: Guid
  nome: string
  sobrenome: string
  telefone : string
  email : string
  tipo_tel : string 
  private contato : Contato
  private arrayPessoa: any
  
  
  private contatoSelecionado : Contato
  public modoDeEdicao = false
  
  constructor(
    private route : ActivatedRoute,
    private contatos : DadosContatosService,
    public alertController : AlertController,
    private formBuilder : FormBuilder,
    private DadosContatos : DadosContatosService
   
    
  ) { }

  

  
  IniciarEdicao(){
    this.modoDeEdicao = true

  }

  EncerrarEdicao(){

    const id : string = String(this.route.snapshot.paramMap.get('id'))


    if (id != 'add'){
      if (this.clienteForm.valid){

        this.DadosContatos.AlterarContatoId(id, this.clienteForm.value)
      this.modoDeEdicao = false
     }
    }

    else {
      if (this.clienteForm.valid){
        //item 1
      // this.contatos.recebeDados(this.contatoSelecionado)
      this.DadosContatos.inserir(this.clienteForm.value)
      this.modoDeEdicao = false
      }
    }

    
      // if (this.clienteForm.valid){
      //   this.DadosContatos.inserir(this.clienteForm.value)
      // }

      // this.DadosContatos.inserir(this.contato)
      

    
  }

  async showOptions() {
    const alert = await this.alertController.create({
      header: "Confirmar",
      message: "Deseja mesmo excluir esse contato?",
      buttons: [
        {
          text: "Voltar",
          role: "cancel",
          handler: () => {
            console.log("Declined the offer");
            
            
          },
        },
        {
          text: "Sim",
          handler: () => {
            console.log("Accepted the offer");
            this.deletarProduto()
          },
        },
      ],
    });
  
    await alert.present();
  }
  deletarProduto(){
    const id : string = String(this.route.snapshot.paramMap.get('id'))

    this.DadosContatos.deletaDados(id)
    // this.contatos.deletaDados(this.contatoSelecionado)
  }

 

  ngOnInit() {

    this.contatoSelecionado = {id: Guid.createEmpty(), nome:'',sobrenome:'',telefone:'',email:'', tipo_tel:''}
   

    const id : string = String(this.route.snapshot.paramMap.get('id'))


    if (id != 'add'){
       this.contatos.enviarDadosId(id).then(array => this.contatoSelecionado = array)


    }else{
    //  this.contatoSelecionado = {id, nome:"", telefone:''}
     this.modoDeEdicao = true 
    }

 
     

     

      this.DadosContatos.listarTodos().then(arrayPessoa => {this.arrayPessoa = this.arrayPessoa} )

    

   
  

  this.clienteForm=this.formBuilder.group({
    id : [this.contatoSelecionado.id],
    nome : [this.contatoSelecionado.nome, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
    sobrenome : [this.contatoSelecionado.sobrenome, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(19)])],
    email : [this.contatoSelecionado.email, Validators.compose([Validators.required, Validators.email])],
    telefone : [this.contatoSelecionado.telefone, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],
    tipo_tel : [this.contatoSelecionado.tipo_tel, Validators.required]
    
  })

 

  // this.DadosContatos.inserir(this.contato)

  

  }

} 
