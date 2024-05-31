import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Router } from "@angular/router";
import { User } from "../../app/models/session-data";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public httpClient = inject(HttpClient);
    public router = inject(Router);
    public endpoint = 'compagnie';

    public currentUser?: Observable<User | null>;
    public currentUserSubject: BehaviorSubject<User | null>;

    public milliardUser?: Observable<{ user: string, password: string } | null>;
    public milliardUserSubject: BehaviorSubject<{ user: string, password: string } | null>;

    constructor() {
        const currentUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(currentUser ? JSON.parse(currentUser) : null);
        this.milliardUserSubject = new BehaviorSubject<{ user: string, password: string } | null>(null);
    }

    // login(email: string, password: string) {
    //     return this.httpClient.post<any>(`${environment.aasURL}/${this.endpoint}/session/token`, { username: email, password, grant_type: 'password' })
    //         .pipe(
    //             map(userResp => {
    //                 if (userResp && userResp.operationStatus === 'SUCCESS') {
    //                     const currentUser = { access_token: userResp.data?.access_token, refresh_token: userResp.data?.refresh_token }
    //                     localStorage.setItem('currentUser', JSON.stringify(currentUser));
    //                     this.currentUserSubject.next(currentUser)
    //                 }
    //
    //                 return userResp;
    //             })
    //         );
    // }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    setMilliardAccount(mUser: any) {
        this.milliardUserSubject.next(mUser ? { user: mUser.user, password: mUser.password } : null)
    }
}
