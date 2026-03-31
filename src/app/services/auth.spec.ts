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
  // Array privado en memoria — actúa como base de datos temporal
  // Se reinicia al recargar la página
  private users: User[] = [];

  // Registra un nuevo usuario. Retorna false si el email ya existe
  register(nombre: string, email: string, password: string): boolean {
    // Array.some() recorre el array y retorna true si algún elemento cumple la condición
    const existe = this.users.some((u) => u.email === email);
    if (existe) return false;

    this.users.push({ nombre, email, password });
    return true;
  }

  // Busca un usuario por email y password. Retorna el objeto User o null si no lo encuentra
  login(email: string, password: string): User | null {
  // Array.find() retorna el primer elemento que cumple la condición, o undefined
  // El operador ?? convierte undefined en null
    return this.users.find((u) => u.email === email && u.password === password) ?? null;
  }
}