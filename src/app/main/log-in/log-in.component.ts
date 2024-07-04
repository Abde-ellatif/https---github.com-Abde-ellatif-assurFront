import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../@core/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import {NgToastService} from "ng-angular-popup";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {User} from "../../models/user.model";
import {UserModule} from "../../user.module";

@Component({
  selector: 'gi-log-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {
  public authService = inject(AuthService);
  public router = inject(Router);
  private formBuilder = inject(FormBuilder);
  user!:User

  public connecting = false;
  public submitted = false;
  public loginFailed: boolean = false;


  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required]
  });
  constructor(private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.loginForm
  }

  get getLoginForm() {
    return this.loginForm.controls;
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return this.toast.warning("Merci de remplir toutes les informations pour s'authentifier", 'Authentication Failed', 3000);
    }

    this.connecting = true;
    this.loginFailed = false;
    this.authService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: data => {
          this.connecting = false;

          if (data.activateCompte === false) {
            this.toast.warning("Votre compte a été désactivé. Contactez votre administrateur.", 'Compte désactivé', 3000);
            return;
          }

          if (data.role === 'admin') {
            this.router.navigate(['/client']);
          } else if (data.role === 'user') {
            this.router.navigate(['/uploadData']);
          } else {
            this.router.navigate(['/accueil']);
          }
          this.toast.success("Vous vous êtes authentifié avec succès", 'Authentication Success', 3000);
        },
        error: error => {
          this.connecting = false;
          this.loginFailed = true;
          console.log(error);

          if (error.error && error.error.activateCompte === false) {
            this.toast.warning("Votre compte a été désactivé. Contactez votre administrateur.", 'Compte désactivé', 3000);
          } else {
            this.toast.danger("Email ou mot de passe incorrect", 'Authentication Failed', 3000);
          }
        }
      });
  }





  // login() {
  //   this.submitted = true;
  //
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //
  //   this.connecting = true;
  //   this.loginFailed = false;
  //   this.authService
  //     .login(this.getLoginForm['email'].value, this.getLoginForm['password'].value)
  //     .pipe(first())
  //     .subscribe(
  //       {
  //         next: data => {
  //           this.connecting = false;
  //           this.router.navigate(['/accueil']);
  //         },
  //         error: error => {
  //           this.connecting = false;
  //           this.loginFailed = true;
  //           console.log(error);
  //         }
  //       });
  //  }
}
