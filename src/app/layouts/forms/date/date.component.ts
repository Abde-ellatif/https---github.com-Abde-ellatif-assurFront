import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Control } from '../../../models/control';

@Component({
  selector: 'fthr-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss'
})
export class DateComponent {
  @Input({ required: true }) control?: Control;

}
