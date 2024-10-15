import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutService } from '../servicios/aut.service'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutService); // Cambia a AutService según tu nombre de servicio
  const router = inject(Router); // Inyecta el Router para redirigir
  const token = authService.getToken();

  if (token) {
    return true; // Permitir el acceso si hay un token
  } else {
    router.navigate(['/login']); // Redirigir al login si no hay token
    return false; // Bloquear el acceso
  }
};
