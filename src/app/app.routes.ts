import { Routes } from '@angular/router';
import { LogInComponent } from './main/log-in/log-in.component';
import { HomeComponent } from './main/home/home.component';
import { authGuardFn } from '../@core/auth/auth.guard';
import {UploadcsvComponent} from "./uploadcsv/uploadcsv.component";
import {CostmerComponent} from "./costmer/costmer.component";
import {UserComponent} from "./user/user.component";

export const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'accueil', component: HomeComponent, canActivate: [authGuardFn]},
    {path:'uploadData', component:UploadcsvComponent, canActivate: [authGuardFn]},
    {path:'client', component:CostmerComponent, canActivate: [authGuardFn]},
    {path:'users',component:UserComponent,canActivate:[authGuardFn]},
    { path: '**', redirectTo: '/accueil', pathMatch: 'full' }
];
