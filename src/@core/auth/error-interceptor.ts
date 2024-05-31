import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

export const ErrorInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
    return next(req).pipe(catchError(err => {
        if (err.status == 401) {
            authService.logout();
        }

        const error = err?.error || err?.error?.message || err.statusText;
        return throwError(() => new Error(error));
    }));
};