import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from '../control/control.component';
import { Section } from '../../models/section';

@Component({
  selector: 'fthr-section',
  standalone: true,
  imports: [
    CommonModule,
    ControlComponent,
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  @Input({ required: true }) section?: Section;
}
