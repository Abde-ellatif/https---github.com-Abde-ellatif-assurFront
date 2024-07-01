import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../services/client.service';
import {NgIf} from "@angular/common";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-uploadcsv',
  templateUrl: './uploadcsv.component.html',
  styleUrls: ['./uploadcsv.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class UploadcsvComponent implements OnInit {
  form!: FormGroup;
  file!: File;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _clientService: ClientService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.form = this._formBuilder.group({
      file: [null, Validators.required],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.form.patchValue({
        file: this.file,
      });
    }
  }

  submit(): void {
    if (this.form.valid && this.file) {
      this._clientService.uploadClient(this.file).subscribe(
        (response) => {
          console.log('Upload successful', response);
          this.toast.success("le fichier a été charger avec succes", 'sucess',4000)
          this.form.reset();
        },
        (error) => {
          console.error('Upload error', error);
          this.toast.danger("probleme lors du chargement du fichier merci de revérifier ",'error',3000);
          this.form.reset();
        }
      );
    }
  }
}
