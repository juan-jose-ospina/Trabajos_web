import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm  = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isLoading    = false;
  showPassword = false;

  constructor(
    private fb:     FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName:  ['', [Validators.required, Validators.minLength(2)]],
        email:     ['', [Validators.required, Validators.email]],
        password:  ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        terms:     [false, Validators.requiredTrue],
      },
      { validators: passwordsMatchValidator },
    );
  }

  
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName()  { return this.registerForm.get('lastName');  }
  get email()     { return this.registerForm.get('email');     }
  get password()  { return this.registerForm.get('password'); }
  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    try {
      const { firstName, lastName, email, password } = this.registerForm.value;


      console.log('Registro exitoso:', { firstName, lastName, email });
      await this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al registrar:', error);
    } finally {
      this.isLoading = false;
    }
  }

  loginWithGoogle(): void {
    console.log('Login con Google');
  }

  loginWithGithub(): void {
    console.log('Login con GitHub');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}