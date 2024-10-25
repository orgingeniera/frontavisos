import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// El interceptor acepta solo dos parámetros: req y next, y recibe un token opcional (string | null)
export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn, token: string | null): Observable<HttpEvent<any>> => {
  // Si hay un token, clona la solicitud y agrega el token en los headers
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return next(cloned); // Pasa la solicitud clonada al siguiente manejador
  }

  // Si no hay token, simplemente continúa con la solicitud original
  return next(req);
};
