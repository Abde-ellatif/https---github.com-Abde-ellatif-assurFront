import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { Client } from "../models/Client.model";
import { ClientService } from "../services/client.service";
import { catchError, map, Observable, of, startWith } from "rxjs";
import { AppDataState, DataStateEnum } from "../state";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {NgToastService} from "ng-angular-popup";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-costmer',
  standalone: true,
  templateUrl: './costmer.component.html',
  styleUrls: ['./costmer.component.scss'],
  imports: [MatTableModule, MatPaginatorModule, MatProgressSpinnerModule,CommonModule,MatSelectModule],
})
export class CostmerComponent implements OnInit, AfterViewInit {
  totalCount = 0;
  pageNumber = 1;
  pageSize = 5;
  clients!: Client[];
  data$: Observable<AppDataState<Client[]>> | null = null;
  public readonly DataStateEnum = DataStateEnum;

  displayedColumns: string[] = [
    'Matricule', 'Name', 'Prenom', 'Email', 'Telephone', 'Sexe', 'DateFeet', 'DateSortie', 'code1', 'code2', 'Gestionnaire', 'Assureur'
  ];
  dataSource = new MatTableDataSource<Client>(this.clients);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataCharge: boolean = false;

  constructor(private _clientService: ClientService,private toast: NgToastService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllClients() {
    this.dataCharge = true;
    this._clientService.getAllClient(this.pageNumber, this.pageSize).subscribe(
      {
        next: (c) => {
          this.clients = c.clients;
          this.dataSource.data = this.clients;
          this.dataCharge = false;
          this.totalCount = c.totalCount;

        },
        error: (err) => {
          console.log(err);
          this.dataCharge = false;
          this.toast.danger("probleme lors du chargement du fichier merci de revérifier ",'error',3000);

        }
      }
    );
  }
  onPageChange(newPage: number) {
    this.pageNumber = newPage;
    this.getAllClients();
  }
  setPageSize(newPageSize: number) {
    if (newPageSize > 0) {
      this.pageSize = newPageSize;
      this.pageNumber = 1; // Reset to the first page whenever the page size changes
      this.getAllClients();
    }
  }

  protected readonly Option = Option;
}
