import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';

// Interface que representa cada imagen devuelta por la API de la NASA (APOD)
interface ApodItem {
  title: string;
  explanation: string;
  url: string;
  date: string;
  media_type: 'image' | 'video'; // la API puede devolver imágenes o videos
}

const API_KEY = 'inGIryyx91BuIfOFUbCGGJdVsDj9YHPi94pGgG5L';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  // count=6 trae 6 imágenes aleatorias del archivo histórico de la NASA
  // toSignal() convierte el Observable en Signal — Angular maneja la suscripción
  apods = toSignal(
    this.http.get<ApodItem[]>(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=6`
    ),
    { initialValue: [] }
  );

  get nombre(): string {
    return this.authService.currentUser?.nombre ?? 'Usuario';
  }
}