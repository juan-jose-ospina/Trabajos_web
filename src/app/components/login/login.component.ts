import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  email: string = '';
  password: string = '';
  mensaje: string = '';

  login() {
    // Delega la validación al AuthService (no hardcodea credenciales aquí)
    const user = this.authService.login(this.email, this.password);
    if (user) {
      this.router.navigate(['/dashboard']); // navega al dashboard si el login es exitoso
    } else {
      this.mensaje = 'Email o contraseña incorrectos.';
    }
  }
}