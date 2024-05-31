import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../models/session-data';
import { CommandesService } from '../../services/commandes.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {LogInComponent} from "../../main/log-in/log-in.component";

@Component({
  selector: 'fthr-header',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input({ required: true }) collapsedSidebar?: boolean;
  @Input() user?: User | null;

  public authService = inject(AuthService);
  public commandesService = inject(CommandesService);
  public dialog = inject(MatDialog);
  public qrSolde?: number;
  public connectedMilliard: boolean = false;

  ngOnInit(): void {
    // this.getCommandes();
    // this.commandesService.soldeChanged$.subscribe({
    //   next: changed => {
    //     if (changed) {
    //       this.getCommandes();
    //     }
    //   }
    // })

    this.authService.milliardUserSubject.subscribe({
      next: user => {
        if (user?.user && user?.password) {
          this.connectedMilliard = true;
        } else {
          this.connectedMilliard = false;
        }
      }
    })
  }

  // getCommandes() {
  //   this.commandesService.getSolde().subscribe({
  //     next: res => {
  //       this.qrSolde = res.data;
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   });
  // }

  logout() {
    this.authService.logout();
  }

  loginMilliard() {
    const dialogRef = this.dialog.open(LogInComponent,
      {
        minWidth: '500px',
        maxHeight: '80%',
      }
    );

    dialogRef.afterClosed().subscribe(mUser => {
      if (mUser?.user && mUser?.password) {
        this.authService.setMilliardAccount(mUser);
      }
    });
  }

  logoutMilliard() {
    this.authService.setMilliardAccount(null);
  }
}
