import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface IRestaurante {
  cardapios: ICardapios[];
  id: string;
  localizacao: ILocalizacoes;
  nome: string;
  restricoes:
  'NAO_CONTEM_GLUTEN' |
  'NAO_CONTEM_LACTOSE' |
  'VEGANO' |
  'VEGETARIANO';
}

export interface ICardapios {
  nome: string;
  itens: {
    nome: string
  }[];
}

export interface ILocalizacoes {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
}

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent implements OnInit {

  paginaRestaurante = false;
  paginaUsuario = false;
  listagemRestaurante = true;

  naoContemGluten = false;
  naoContemLactose = false;
  vegetariano = false;
  vegano = false;

  editar = false;
  nomeUsuario = '';
  emailUsuario = '';
  nomeRestaurante = '';
  idRestaurante = '';

  cardapio: ICardapios = {
    nome: null,
    itens: [{
      nome: '',
    }],
  };

  localizacao: ILocalizacoes = {
    rua: null,
    bairro: null,
    cidade: null,
    estado: null
  };

  getAllrestaurante: IRestaurante[] = null;

  constructor(
    public httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:8081/restaurante').subscribe(
      (teste: IRestaurante[]) => { this.getAllrestaurante = teste; }
    );
  }

  verificaRestricoes() {
    const restricoes = [];
    if (this.naoContemLactose) {
      restricoes.push('NAO_CONTEM_LACTOSE');
    }
    if (this.naoContemGluten) {
      restricoes.push('NAO_CONTEM_GLUTEN');
    }
    if (this.vegano) {
      restricoes.push('VEGANO');
    }
    if (this.vegetariano) {
      restricoes.push('VEGETARIANO');
    }

    return restricoes;
  }

  literal(item: string) {
    return item === 'NAO_CONTEM_GLUTEN' ?
      'Não contém gluten' : item === 'NAO_CONTEM_LACTOSE' ?
        'Não contém lactose' : item === 'VEGANO' ?
          'Vegano' : item === 'VEGETARIANO' ? 'Vegetariano' : '';
  }

  existeRestricoes(restricoes: any) {
    this.vegano = restricoes.some((r) => r === 'VEGANO');
    this.vegetariano = restricoes.some((r) => r === 'VEGETARIANO');
    this.naoContemGluten = restricoes.some((r) => r === 'NAO_CONTEM_GLUTEN');
    this.naoContemLactose = restricoes.some((r) => r === 'NAO_CONTEM_LACTOSE');

    return restricoes;
  }

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
    this.httpClient.get('http://localhost:8081/restaurante').subscribe(
      (teste: IRestaurante[]) => { this.getAllrestaurante = teste; }
    );
  }

  salvarUsuario() {
    this.httpClient.post('http://localhost:8081/usuario', {
      nome: this.nomeUsuario,
      email: this.emailUsuario
    }).subscribe(() => this.reset());
  }

  excluirUsuario() {
    this.httpClient.delete(`http://localhost:8081/usuario/${this.emailUsuario}`).subscribe(() => this.reset());
  }

  editarRestaurante(item: IRestaurante) {
    this.idRestaurante = item.id;
    this.cardapio = item.cardapios[0];
    this.localizacao = item.localizacao;
    this.nomeRestaurante = item.nome;
    this.editar = true;
    this.existeRestricoes(item.restricoes);
  }

  salvarRestaurante() {
    if (!this.editar) {
      this.httpClient.post('http://localhost:8081/restaurante', {
        cardapios: [this.cardapio],
        localizacao: this.localizacao,
        restricoes: this.verificaRestricoes(),
        nome: this.nomeRestaurante
      }).subscribe(() => this.reset());
    } else {
      this.httpClient.put(`http://localhost:8081/restaurante/${this.idRestaurante}`, {
        cardapios: [this.cardapio],
        localizacao: this.localizacao,
        restricoes: this.verificaRestricoes(),
        nome: this.nomeRestaurante
      }).subscribe(() => {
        this.reset();
        this.httpClient.get('http://localhost:8081/restaurante').subscribe(
          (teste: IRestaurante[]) => { this.getAllrestaurante = teste; }
        );
        this.editar = false;
      });
    }
  }

  excluirRestaurante(restaurante) {
    this.httpClient.delete(`http://localhost:8081/restaurante/${restaurante.id}`).subscribe(
      () => {
        this.httpClient.get('http://localhost:8081/restaurante').subscribe(
          (teste: IRestaurante[]) => {
            this.getAllrestaurante = teste;
          });
        this.reset();
      }
    );
  }

  adicionar() {
    this.cardapio.itens.push({
      nome: ''
    });
  }

  reset() {
    this.idRestaurante = null;
    this.cardapio = {
      nome: null,
      itens: [{
        nome: '',
      }],
    };
    this.localizacao = {
      rua: null,
      bairro: null,
      cidade: null,
      estado: null
    };
    this.nomeRestaurante = null;
    this.nomeUsuario = null;
    this.emailUsuario = null;
    this.naoContemLactose = false;
    this.naoContemLactose = false;
    this.vegetariano = false;
    this.vegano = false;
  }

}
