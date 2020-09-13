import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent implements OnInit {

  paginaRestaurante = false;
  paginaUsuario = false;
  listagemRestaurante = true;

  constructor() {}

  ngOnInit() {}

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

}
