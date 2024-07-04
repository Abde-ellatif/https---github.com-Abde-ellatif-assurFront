import {SortColumn, SortDirection} from "../sortable.directive";
import {BehaviorSubject, debounceTime, Observable, of, Subject, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {DecimalPipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../@core/auth/auth.service";


interface SearchResult {
  users: User[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: number | string | boolean, v2: number | string | boolean) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(users: User[], column: SortColumn, direction: string): User[] {
  if (direction === '' || column === '') {
    return users;
  } else {
    return [...users].sort((a, b) => {
      const res = compare(a[column as keyof User], b[column as keyof User]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(user: User, term: string) {
  return (
    user.userName.toLowerCase().includes(term.toLowerCase()) ||
    user.email.toLowerCase().includes(term.toLowerCase()) ||
    user.activateCompte.valueOf()
  );
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<User[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public endpoint = 'Users';

  getAllUsers(pageNumber: number, pageSize: number) {
    return this.http.get<any>(`${environment.apiURL}/${this.endpoint}/get-users?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient, private _authService: AuthService) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._users$.next(result.users);
        this._total$.next(result.total);
      });

    // Fetch all users initially
    this.getAllUsers(1, 100).subscribe(response => {
      this._users$.next(response.users);
      this._total$.next(response.total);
      this._search$.next(); // Trigger initial search after data is loaded
    });
  }

  get users$() {
    return this._users$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. Sort
    let users = sort(this._users$.getValue(), sortColumn, sortDirection);

    // 2. Filter
    users = users.filter(user => matches(user, searchTerm));
    const total = users.length;

    // 3. Paginate
    users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ users, total });
  }
  toggleActivateCompte(userId: string): Observable<any> {
    return this.http.patch(`${environment.apiURL}/Users/activer-compte/${userId}`, {});
  }

}
