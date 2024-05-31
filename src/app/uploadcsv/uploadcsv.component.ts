import {Component, OnInit, signal} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ClientService} from "../services/client.service";
import {Client} from "../models/Client.model";

@Component({
  selector: 'app-uploadcsv',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './uploadcsv.component.html',
  styleUrl: './uploadcsv.component.scss'
})




export class UploadcsvComponent implements OnInit{
  form!:FormGroup
  client! : Client[]
  animal: string;
  name: string;

  constructor(private _formBuilder:FormBuilder,public dialog: MatDialog, private _clientService:ClientService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadcsvComponent, {
      data: {name: this.name, animal: this.animal},
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  initFormGroup(){
    this.form=this._formBuilder.group({
      clients:[this.client,'',Validators.required]
    })
  }
  submit(){
    return this._clientService.uploadClient(this.client)
  }

  ngOnInit(): void {
    this.initFormGroup()
  }

}
