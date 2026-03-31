import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mensaje: string = '';
  exito: boolean = false;

  register() {
    if (this.password !== this.confirmPassword) {
      this.mensaje = 'Las contraseñas no coinciden.';
      this.exito = false;
      return;
    }

    // AuthService guarda el usuario en su array interno
    // Ese mismo usuario ya puede usarse para hacer login
    const ok = this.authService.register(this.nombre, this.email, this.password);
    if (ok) {
      this.mensaje = `¡Registro exitoso! Bienvenido, ${this.nombre}.`;
      this.exito = true;
    } else {
      this.mensaje = 'Ese email ya está registrado.';
      this.exito = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}