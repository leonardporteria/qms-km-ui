import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isMiniSidebar = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  isUserMenuOpen = false;
  onMenuOpened() {
    this.isUserMenuOpen = true;
  }

  onMenuClosed() {
    this.isUserMenuOpen = false;
  }
  navigateAndCloseSidebar() {
    if (!this.isMiniSidebar) {
      this.toggleSidebar.emit();
    }
  }
}
