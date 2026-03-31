import { Injectable } from '@angular/core';

// Interface: define la forma del objeto usuario (tipado fuerte de TypeScript)
interface User {
  nombre: string;
  email: string;
  password: string;
}

// @Injectable con providedIn: 'root' → Angular crea una única instancia (singleton)
// compartida en toda la app, sin necesitar declararlo en ningún módulo
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Array privado en memoria - actúa como base de datos temporal
  // Se reinicia al recargar la página
  private users: User[] = [
    { nombre: 'Admin', email: 'admin@mail.com', password: '1234' },
  ];

  // Guarda el usuario actualmente logueado. null = sin sesión activa
  currentUser: User | null = null;

  // Registra un nuevo usuario. Retorna false si el email ya existe
  register(nombre: string, email: string, password: string): boolean {
    // Array.some() retorna true si algún elemento cumple la condición
    const existe = this.users.some((u) => u.email === email);
    if (existe) return false;

    this.users.push({ nombre, email, password });
    return true;
  }

  // Busca un usuario por email y password. Si lo encuentra, lo guarda en currentUser
  login(email: string, password: string): User | null {
    // Array.find() retorna el primer elemento que cumple la condición, o undefined
    // El operador ?? convierte undefined en null
    const user = this.users.find((u) => u.email === email && u.password === password) ?? null;
    this.currentUser = user;
    return user;
  }

  // Cierra la sesión limpiando el usuario actual
  logout(): void {
    this.currentUser = null;
  }

  // Indica si hay un usuario logueado - usado en el guard y el navbar
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}