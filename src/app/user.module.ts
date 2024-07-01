import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {UserComponent} from "./user/user.component";
import { NgbdSortableHeader } from './sortable.directive';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbHighlight,
    NgbPaginationModule,
    UserComponent,
    NgbdSortableHeader
  ],
  providers: [DecimalPipe]
})
export class UserModule {}
