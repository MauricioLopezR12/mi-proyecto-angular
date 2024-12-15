import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Obtener el token desde localStorage
  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`, // Añade el token para autenticar
      }),
    };
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`, this.getHttpOptions());
  }

  // Crear un usuario (con imagen)
  addUser(user: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user, this.getHttpOptions());
  }

  // Actualizar un usuario (con imagen opcional)
  updateUser(id: number, user: FormData): Observable<any> {
    // Laravel requiere el método `PUT` en el backend, y podemos usar un workaround con `_method=PUT` para enviar `FormData`.
    return this.http.post<any>(`${this.apiUrl}/users/${id}?_method=PUT`, user, this.getHttpOptions());
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`, this.getHttpOptions());
  }
}
