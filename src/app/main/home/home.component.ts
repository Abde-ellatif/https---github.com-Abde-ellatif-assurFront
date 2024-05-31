import {Component, inject, signal} from '@angular/core';
import {UploadcsvComponent} from "../../uploadcsv/uploadcsv.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  constructor(public dialog: MatDialog) {}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UploadcsvComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
