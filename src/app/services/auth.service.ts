import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) {}

 
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('access_token');
      console.log('Token en localStorage:', token);
      return !!token;
    }
    console.warn('localStorage no está disponible.');
    return false;
  }
  

  
  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  
  saveToken(token: string): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('access_token', token);
      console.log('Token guardado en localStorage:', token);
    } else {
      console.error('localStorage no está disponible.');
    }
  }
  

  
  clearToken(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('access_token');
    }
  }
}