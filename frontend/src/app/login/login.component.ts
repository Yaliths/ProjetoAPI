import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { userAPI } from '../serviços/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userAPI: userAPI) {}

  vericficationEmail(): void {
    //verifica se o email tem @
    if (this.email.includes('@')) {
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Email inválido';
    }
  }

  onSubmit(): void {
    console.log('Tentando logar...');
    this.userAPI.logIn(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login bem-sucedido:', res);
        this.errorMessage = ''; // Limpa mensagens de erro anteriores
        this.router.navigate(['/home']); // Navega para a página inicial
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        this.errorMessage =
          err.error?.error ||
          'Erro ao fazer login. Verifique suas credenciais.'; // Exibe mensagem apropriada
      },
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
