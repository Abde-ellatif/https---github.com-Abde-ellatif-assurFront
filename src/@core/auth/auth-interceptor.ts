import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (

    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const currentUser = inject(AuthService).currentUserSubject.value;
    const authToken = currentUser?.access_token;
    if (currentUser && authToken) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser?.access_token}`
            },
        });
        return next(cloned);
    } else {
        return next(req);
    }
  return next(req);
};

