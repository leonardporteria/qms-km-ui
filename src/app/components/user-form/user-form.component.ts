import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user.model';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class UserFormComponent {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      id: [data?.id],
      name: [
        data?.name || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      email: [
        data?.email || '',
        [Validators.required, Validators.email, Validators.maxLength(150)],
      ],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const user: Users = this.form.value;

    // ! TO FIX: MAKE THE DATABASE HANDLE THIS INSTEAD CLIENT
    // ! ID IS SET TO NULL; FORCING THIS TO DELETE THE ID FOR AUTO INCREMENT
    if (!this.isEditMode) {
      delete (user as any).id;
    }

    const request = this.isEditMode
      ? this.userService.update(user)
      : this.userService.create(user);

    request.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Post error:', err),
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
