import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Control } from '../../../models/control';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'fthr-text',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
  @Input({ required: true }) control?: Control;

}
