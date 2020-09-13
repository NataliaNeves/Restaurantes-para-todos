import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { PaginaRestauranteComponent } from './pagina-restaurante/pagina-restaurante.component';
import { PaginaUsuarioComponent } from './pagina-usuario/pagina-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    PaginaRestauranteComponent,
    PaginaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
