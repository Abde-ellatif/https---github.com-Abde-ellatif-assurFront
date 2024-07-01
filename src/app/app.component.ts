import {Component, OnInit, inject, importProvidersFrom} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SidebarService } from './services/sidebar.service';
import { filter } from 'rxjs';
import { CardTableConfig } from './models/card-table-config';
import { AuthService } from '../@core/auth/auth.service';
import { User } from './models/session-data';
import {CostmerComponent} from "./costmer/costmer.component";
import {NgToastModule, ToasterPosition} from 'ng-angular-popup';
import {DecimalPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgToastModule,
    HeaderComponent,
    SidebarComponent,
    RouterModule,
    CostmerComponent,
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  //Services
  public sidebarService = inject(SidebarService);
  public authService = inject(AuthService);
  public router = inject(Router);

  public user: User | null = null;
  public activeUrl = '';
  public isCollapsedSidebar = this.sidebarService.isCollapsed;

  public tbConfig: CardTableConfig = {
    dataSource: {
      key: 'id',
      title: 'numFacture',
      subTitle: 'objetFacture',
      status: 'statut',
      props: [
        'dateFacture',
        'montant',
        'proprietaire'
      ]
    }
  };

  public data = [
    {
      id: 1,
      numFacture: 'F2359B9 - BN6',
      objetFacture: 'Fournitures informatiques & Installation 0',
      statut: 'In Progress',
      dateFacture: new Date(),
      montant: '5 596.00 DH TTC',
      proprietaire: 'Abdellah Oxxxx'
    }, {
      id: 2,
      numFacture: 'F2352525 - BN6',
      objetFacture: 'Fournitures informatiques & Installation 1',
      statut: 'In Progress',
      dateFacture: new Date(),
      montant: '5 596.00 DH TTC',
      proprietaire: 'Abdellah Oxxxx'
    }, {
      id: 3,
      numFacture: 'F2352554 - FB2',
      objetFacture: 'Fournitures informatiques & Installation 2',
      statut: 'In Progress',
      dateFacture: new Date(),
      montant: '5 596.00 DH TTC',
      proprietaire: 'Abdellah Oxxxx'
    }, {
      id: 4,
      numFacture: 'F235FG254 - LN6',
      objetFacture: 'Fournitures informatiques & Installation 3',
      statut: 'In Progress',
      dateFacture: new Date(),
      montant: '5 596.00 DH TTC',
      proprietaire: 'Abdellah Oxxxx'
    }
  ];

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe({
        next: (route: any) => {
          this.activeUrl = route?.url;
        }
      });

    this.authService.currentUserSubject.subscribe({
      next: user => {
        this.user = user;
      }
    });
  }

  protected readonly ToasterPosition = ToasterPosition;
}
