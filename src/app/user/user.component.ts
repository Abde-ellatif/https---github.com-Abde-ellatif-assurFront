import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

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
    NgbPaginationModule
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

  constructor(public _userService: UserService) {
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

  trackById(index: number, user: User): number {
    return user.id;
  }
}
