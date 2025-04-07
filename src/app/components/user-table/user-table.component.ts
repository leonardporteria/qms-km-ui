import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSort,
  ],
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  columns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<Users>([]);

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    this.userService.getAll().subscribe((data: Users[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  viewUser(user: Users): void {
    console.log('Viewing user:', user);
  }

  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.loadUsers();
    });
  }

  openEditModal(user: Users): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.loadUsers();
    });
  }

  confirmDelete(user: Users): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: `Delete ${user.name}?`,
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userService.delete(user.id).subscribe(() => this.loadUsers());
      }
    });
  }
}
