import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { AutService } from '../../servicios/aut.service'; // Ajusta la ruta según tu proyecto
import { authInterceptor } from './auth.interceptor';    // Ruta del archivo donde tengas tu interceptor

// Factory function para inyectar el servicio en el interceptor
export function authInterceptorFactory(req: HttpRequest<any>, next: HttpHandlerFn) {
  const authService = inject(AutService);  // Inyecta el servicio AutService
  const token = authService.getToken();    // Obtén el token del servicio (puede ser string o null)
  return authInterceptor(req, next, token); // Pasa el token a tu interceptor
}
