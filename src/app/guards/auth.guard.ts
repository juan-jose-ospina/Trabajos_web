import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard funcional (Angular 14+): protege rutas que requieren sesión activa
// Angular lo ejecuta automáticamente antes de cargar el componente de la ruta
// Se registra en app.routes.ts con la propiedad canActivate: [authGuard]
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // permite el acceso → carga el componente
  }

  // Redirige al login y bloquea el acceso a la ruta protegida
  return router.createUrlTree(['/login']);
};