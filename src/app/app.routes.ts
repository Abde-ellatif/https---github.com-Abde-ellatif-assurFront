import { Routes } from '@angular/router';
import { LogInComponent } from './main/log-in/log-in.component';
import { HomeComponent } from './main/home/home.component';
import { authGuardFn } from '../@core/auth/auth.guard';
import {UploadcsvComponent} from "./uploadcsv/uploadcsv.component";
import {CostmerComponent} from "./costmer/costmer.component";

export const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'accueil', component: HomeComponent},
    {path:'uploadData', component:UploadcsvComponent},
    {path:'client', component:CostmerComponent},
    { path: '**', redirectTo: '/accueil', pathMatch: 'full' }
];
