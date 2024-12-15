import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuth = this.authService.isAuthenticated();

    // Registro para depuración
    console.log('¿Usuario autenticado en AuthGuard?:', isAuth);

    if (isAuth) {
      // Si está autenticado, permitir acceso
      console.info('Acceso permitido al usuario.');
      return true;
    } else {
      // Si no está autenticado, redirigir al login
      console.warn('Usuario no autenticado. Redirigiendo al login.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
