import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // inject() -forma moderna de inyectar dependencias (Angular 14+)
  // Reemplaza al constructor(private router: Router)
  private router = inject(Router);
  private authService = inject(AuthService);

  // Getter: se recalcula cada vez que el template lo usa
  // Accede al usuario logueado desde el servicio (singleton compartido)
  get nombre(): string {
    return this.authService.currentUser?.nombre ?? 'Usuario';
  }

  logout() {
    this.authService.logout();        // limpia currentUser en el servicio
    this.router.navigate(['/login']); // redirige al login
  }
}