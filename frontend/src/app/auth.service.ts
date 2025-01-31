import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDBUrl = 'http://localhost:3000/users' // Caminho relativo ao arquivo no mesmo nível



  constructor(private http: HttpClient) {}

  // Função para carregar usuários do arquivo JSON
  getUsers(): Observable<any> {
    console.log("getUsers")
    return this.http.get(this.userDBUrl);

  }

  // Função para autenticar
  authenticate(username: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
        this.getUsers().subscribe({
            next: (data) => {
              console.log(data);
                // Verifica se a estrutura é válida
                if (data) {
                    const user = data.find(
                        (u: any) => u.username === username && u.password === password
                    );

                    if (user) {
                        observer.next(true); // Usuário autenticado
                    } else {
                        observer.next(false); // Credenciais inválidas
                    }
                } else {
                    console.error("Estrutura do JSON inválida ou dados ausentes.");
                    observer.next(false);
                }

                observer.complete();
            },
            error: (err) => {
                console.error("Erro ao carregar usuários:", err);
                observer.error("Erro ao carregar usuários.");
            },
        });
    });
}

}
