import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent implements OnInit {

  paginaRestaurante = false;
  paginaUsuario = false;
  listagemRestaurante = true;

  nomeUsuario = '';
  emailUsuario = '';
  nomeRestaurante = '';
  cardapio: {
    cardapios: {
      nome: string,
      itens: {
        nome: string
        restricoes:
        'NAO_CONTEM_GLUTEN' |
        'NAO_CONTEM_LACTOSE' |
        'VEGANO' |
        'VEGETARIANO'
      }[]
    }
  } = {
      cardapios: {
        nome: null,
        itens: [{
          nome: '',
          restricoes: null
        }]
      }
    };

  localizacao: {
    localizacao: {
      rua: string,
      bairro: string,
      cidade: string,
      estado: string
    }
  } = {
      localizacao: {
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    };

  constructor() { }

  ngOnInit() { }

  trocaUsuario() {
    this.paginaUsuario = true;
    this.listagemRestaurante = false;
    this.paginaRestaurante = false;
  }

  trocaRestaurante() {
    this.paginaRestaurante = true;
    this.paginaUsuario = false;
    this.listagemRestaurante = false;
  }

  listaRestaurante() {
    this.listagemRestaurante = true;
    this.paginaUsuario = false;
    this.paginaRestaurante = false;
  }

  salvarUsuario() {
    console.log('teste');
  }

  excluirUsuario() {
    console.log('teste');
  }

  salvarRestaurante() {
    console.log('teste');
  }

  excluirRestaurante() {
    console.log('teste');
  }

  adicionar() {
    this.cardapio.cardapios.itens.push({
      nome: '',
      restricoes: null
    });
  }

}
