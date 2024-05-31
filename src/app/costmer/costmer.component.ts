import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { Client } from "../models/Client.model";
import { ClientService } from "../services/client.service";
import { catchError, map, Observable, of, startWith } from "rxjs";
import { AppDataState, DataStateEnum } from "../state";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-costmer',
  standalone: true,
  templateUrl: './costmer.component.html',
  styleUrls: ['./costmer.component.scss'],
  imports: [MatTableModule, MatPaginatorModule, MatProgressSpinnerModule,CommonModule],
})
export class CostmerComponent implements OnInit, AfterViewInit {
  clients!: Client[];
  data$: Observable<AppDataState<Client[]>> | null = null;
  public readonly DataStateEnum = DataStateEnum;

  displayedColumns: string[] = [
    'Matricule', 'Name', 'Prenom', 'Email', 'Telephone', 'Sexe', 'DateFeet', 'DateSortie', 'code1', 'code2', 'Gestionnaire', 'Assureur'
  ];
  dataSource = new MatTableDataSource<Client>(this.clients);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataCharge: boolean = false;

  constructor(private _clientService: ClientService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllClients() {
    this.dataCharge = true;
    this._clientService.getAllClient().subscribe(
      {
        next: (c) => {
          this.clients = c;
          this.dataSource.data = this.clients;
          this.dataCharge = false;
        },
        error: (err) => {
          console.log(err);
          this.dataCharge = false;
        }
      }
    );
  }
}
