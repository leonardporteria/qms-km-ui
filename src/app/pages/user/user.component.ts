import { Component } from '@angular/core';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, UserTableComponent],
  selector: 'app-user-page',
  template: `<app-user-table />`,
})
export class UserComponent {}
