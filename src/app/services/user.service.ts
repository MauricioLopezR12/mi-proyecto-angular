import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  
  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`, 
      }),
    };
  }

  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`, this.getHttpOptions());
  }

  
  addUser(user: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user, this.getHttpOptions());
  }

 
  updateUser(id: number, user: FormData): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/users/${id}?_method=PUT`, user, this.getHttpOptions());
  }

  
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`, this.getHttpOptions());
  }
}
