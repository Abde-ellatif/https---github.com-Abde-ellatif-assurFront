import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const authGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    const currentUser = inject(AuthService).currentUserSubject.value;

    if (currentUser && currentUser.access_token) {
        return true;
    } else {
        inject(Router).navigate(['/login'])
        return false;
    }
}