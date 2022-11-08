import { Component, OnInit } from '@angular/core';
import { DadosContatosService } from 'src/app/service/dados-contatos.service';

@Component({
  selector: 'app-listagem-contatos',
  templateUrl: './listagem-contatos.page.html',
  styleUrls: ['./listagem-contatos.page.scss'],
})
export class ListagemContatosPage implements OnInit {

  public todosDados : any
  // public contato : any

  constructor(private dados : DadosContatosService) { }

  ngOnInit() {
    this.todosDados = this.dados.enviarTodosDados()
  }

}
