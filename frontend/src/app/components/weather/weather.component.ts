
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../serviços/places.service';
import { CommonModule } from '@angular/common'; // Para habilitar *ngIf
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)]
import dayjs from 'dayjs';
import { userAPI } from '../../serviços/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  userIP: string = '';
  errorMessage: string = '';  
  city: string = '';
  country: string = '';
  date: string = '';
  locations: any[] = [];
  data: any;
  weather: any;

  constructor(
    private ApiService: ApiService,
    private useApi: userAPI,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // Buscar o endereço IP do usuário
      const isResponse = await fetch('https://api.ipify.org?format=json');
      if(!isResponse.ok) throw new Error('Erro ao buscar IP');
      const ipData = await isResponse.json();
      this.userIP = ipData.ip;
      console.log(`IP do usuário: ${this.userIP}`);
    } catch (error) {
      console.error(error);
    }
  }
  search(): void {
    this.ApiService.getWeatherAndPlaces(
      this.city,
      this.country,
      this.date
    ).subscribe({
      next: (res) => {
        console.log('Dados obtidos:', res);
        this.data = res.places; // Lista de lugares
        this.weather = res.weather; // Dados do clima
        this.errorMessage = ''; // Limpa a mensagem de erro
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar dados, tente novamente.';	
        console.error('Erro ao buscar dados:', err);
      },
    });
  }

  logout(): void {
    this.useApi.logOut().subscribe({
      next: () => {
        console.log('Logout bem-sucedido');
        this.router.navigate(['/login']); // Navega para a página de login
      },
      error: (err) => {
        console.error('Erro ao fazer logout:', err);
      },
    });
  }
}

