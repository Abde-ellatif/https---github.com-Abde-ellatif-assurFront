import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// @ts-ignore
import { Control } from '../../models/control';
import { TextComponent } from '../forms/text/text.component';
import { DateComponent } from '../forms/date/date.component';
import { SelectComponent } from '../forms/select/select.component';

@Component({
  selector: 'fthr-control',
  standalone: true,
  imports: [
    CommonModule,

    //Components
    TextComponent,
    SelectComponent,
    DateComponent
  ],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss'
})
export class ControlComponent {
  @Input({ required: true }) control?: Control;
}
