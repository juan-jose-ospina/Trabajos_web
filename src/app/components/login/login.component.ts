import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],       // <-- necesario para usar [(ngModel)]
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Propiedades que se enlazan con el HTML (Two-way binding con ngModel)
  email: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(private router: Router) {}

  login() {
    // Validación básica
    if (this.email === '' || this.password === '') {
      this.mensaje = 'Por favor completá todos los campos.';
      return;
    }

    // Credenciales de prueba (hardcodeadas para aprender)
    if (this.email === 'admin@mail.com' && this.password === '1234') {
      this.mensaje = '¡Login exitoso! Bienvenido.';
    } else {
      this.mensaje = 'Email o contraseña incorrectos.';
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}