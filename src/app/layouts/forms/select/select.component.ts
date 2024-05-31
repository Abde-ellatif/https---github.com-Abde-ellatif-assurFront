import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Control } from '../../../models/control';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'fthr-select',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input({ required: true }) control?: Control;

}
