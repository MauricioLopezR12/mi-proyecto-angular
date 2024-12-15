import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log('Datos enviados al backend:', { email: this.email, password: this.password });
  
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Respuesta del backend:', response);
        
        
        this.authService.saveToken(response.access_token);
        
        
        localStorage.setItem('user_email', this.email);
  
        console.log('Token guardado correctamente.');
        
        
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error del backend:', error);
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    );
  }
  
}
