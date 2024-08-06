import { CommonModule } from "@angular/common";
import { Component, } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../core/auth/auth.service";
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-auth-popup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
   
  ],
  providers:[AuthService],
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss'],
})
export class AuthPopupComponent {
  form: FormGroup;
  isLoginMode!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _dialogRef: MatDialogRef<AuthPopupComponent>

 
  ) {
    // this.isLoginMode = this.isLoginMode;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: [''],
    });

    if (this.isLoginMode) {
      this.form.removeControl('username');
    }
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.form.value).subscribe(
        (response) => {
          this.closeDialog()
          // Handle successful login
        },
        (error) => {
          // Handle error
        }
      );
    } else {
      this.authService.signup(this.form.value).subscribe(
        (response) => {
          this.closeDialog()
          // Handle successful signup
        },
        (error) => {
          // Handle error
        }
      );
    }
  }
  closeDialog() {
    this._dialogRef.close();
  }
}

