import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CoreMenu, CoreMenuItem } from '../../models/sidebar-menu';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';
import { User } from '../../models/session-data';


@Component({
  selector: 'fthr-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input({ required: true }) collapsedSidebar?: boolean;
  @Input() user?: User | null;

  public sidebarService = inject(SidebarService);
  public router = inject(Router);

  public openedRootId?: string;
  public activeItemId?: string;
  public animating?: boolean;

  public menu: CoreMenu = {
    children: [
      {
        id: '1',
        title: 'Accueil',
        url: 'accueil',
        type: 'item',
        icon: 'house'

      },
      {
        id: '2',
        title: 'Upload Data',
        type: 'item',
        url: 'uploadData',
        icon: 'database-fill'
      },
      {
        id: '3',
        title: 'Attestations',
        url: 'attestations',
        type: 'item',
        icon: 'file-earmark-text'
      },

    ]
  }

  menuRootClicked(item: CoreMenuItem) {
    this.openedRootId = (this.openedRootId == item.id) ? undefined : item.id

    if (item.url && item.type == 'item') {
      this.router.navigate([item.url])
    }
  }

  menuItemClicked(item: CoreMenuItem) {
    this.activeItemId = item.id;

    if (item.url && item.type == 'item') {
      this.router.navigate([item.url])
    }
  }

  toggleSidebar() {
    this.animating = true;
    const timeOut = setTimeout(() => {
      this.animating = false;
      clearTimeout(timeOut);
    }, 300);

    this.sidebarService.isCollapsed.update(collapsed => !collapsed);;
  }
}
