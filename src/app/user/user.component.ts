import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import {Toast, ToastrService} from "ngx-toastr";
import {NgToastService} from "ng-angular-popup";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbHighlight,
    NgbdSortableHeader,
    NgbPaginationModule,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuTrigger
  ],
  providers: [DecimalPipe],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  total$: Observable<number>;
  _users$: Observable<User[]>;

  private _searchTerm: string = '';
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public _userService: UserService,private toast : NgToastService) {
    this.total$ = _userService.total$;
    this._users$ = _userService.users$;
  }

  ngOnInit(): void {
    this._users$.subscribe(users => console.log(users)); // Vérifiez les utilisateurs ici
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this._userService.searchTerm = value;
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this._userService.sortColumn = column;
    this._userService.sortDirection = direction;
  }

  trackById(index: number, user: User): string {
    return user.id;
  }

  toggleActivateCompte(user: any) {
    const action = user.activateCompte ? 'désactiver' : 'activer';
    if (confirm(`Êtes-vous sûr de vouloir ${action} cet utilisateur?`)) {
      // Appeler votre service pour activer/désactiver le compte
      this._userService.toggleActivateCompte(user.id).subscribe(
        response => {
          user.activateCompte = !user.activateCompte;
          this.toast.success(`Le compte a été ${action} avec succès.`);
        },
        error => {
          this.toast.danger(`Erreur lors de la tentative de ${action} le compte.`);
        }
      );
    }
  }
}
