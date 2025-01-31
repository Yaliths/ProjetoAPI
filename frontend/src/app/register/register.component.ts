import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import { HttpClient } from '@angular/common/http';
import { userAPI } from '../serviços/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicionar CommonModule e FormsModule
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  email: string = '';
  passwordCaracteres: boolean = false;
  passwordconfirm: string = '';

  constructor(
    private http: HttpClient,
    private userAPI: userAPI,
    private router: Router
  ) {}


  vericficationEmail(): void {
    //verifica se o email tem @
    if (this.email.includes('@')) {
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Email inválido';
    }
  }

  verificationPassword(): void {
    //verifica se a password tem menos de 8 caracteres
    if (this.password.length < 8) {
      this.passwordCaracteres = true;
      return;
    } else {
      this.passwordCaracteres = false;
    }
  }

  isPasswordValid(): boolean {
    const password = this.password;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
    this.passwordCaracteres = hasUpperCase && hasSpecialChar && hasMinLength;
    return this.passwordCaracteres;
  }

  doPasswordsMatch(): boolean {
    return this.password === this.passwordconfirm; 
  }

  onRegister(): void {
    console.log('entrei');
    this.userAPI.registar(this.email, this.password).subscribe({
      next: (res) => console.log('registo com sucesso'),
      error: (err) => {
        this.errorMessage = err;
      },
    });
    this.router.navigate(['/login']);
  }
}
