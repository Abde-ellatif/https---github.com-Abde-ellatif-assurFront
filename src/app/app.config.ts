import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, HttpInterceptorFn, provideHttpClient, withInterceptors} from '@angular/common/http';
import { authInterceptor } from '../@core/auth/auth-interceptor';
import { ErrorInterceptor } from '../@core/auth/error-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {DecimalPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(), provideAnimationsAsync(),provideHttpClient(withInterceptors([authInterceptor, ErrorInterceptor])), provideAnimationsAsync(),
    DecimalPipe,FormsModule


]
};
