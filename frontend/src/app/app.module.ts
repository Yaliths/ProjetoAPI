import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)]
import { HttpClientModule } from '@angular/common/http'; // Para chamadas HTTP
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component'; // Componente raiz
import { WeatherComponent } from './components/weather/weather.component'; // Substitua pelo seu componente

@NgModule({
  declarations: [
    AppComponent,
    // Liste aqui todos os componentes criados
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent], // Componente raiz que será inicializado
})
export class AppModule {}
