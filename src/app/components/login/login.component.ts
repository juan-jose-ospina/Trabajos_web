import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
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
    const user = this.authService.login(this.email, this.password);
    if (user) {
      this.router.navigate(['/dashboard']);
    } else {
      this.mensaje = 'Email o contraseña incorrectos.';
    }
  }
}