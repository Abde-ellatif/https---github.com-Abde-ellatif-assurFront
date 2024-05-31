import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
//import { MilliardLoginComponent } from "../../app/main/log-in/milliard-log-in/milliard-log-in.component";
import { MatDialog } from "@angular/material/dialog";
import {LogInComponent} from "../../app/main/log-in/log-in.component";

export const milliardAuthGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    const dialog = inject(MatDialog);
    const authService = inject(AuthService);
    const router = inject(Router);
    const mUser = authService.milliardUserSubject.value;

    if (mUser && mUser.user && mUser.password) {
        return true;
    } else {
        const dialogRef = dialog.open(/*MilliardLoginComponent*/LogInComponent,
            {
                data: { redirect: true },
                minWidth: '500px',
                maxHeight: '80%',
            }
        );

        dialogRef.afterClosed().subscribe(mUser => {
            if (mUser?.user && mUser?.password) {
                authService.setMilliardAccount(mUser);
                router.navigate(['/attestations']);
            }
        });

        return false;
    }
}
