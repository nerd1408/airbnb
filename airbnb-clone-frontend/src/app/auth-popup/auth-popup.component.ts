import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../core/auth/auth.service";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-auth-popup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [AuthService],
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss'],
})
export class AuthPopupComponent {
  form: FormGroup;
  isLoginMode: boolean = true ;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _dialogRef: MatDialogRef<AuthPopupComponent>
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: ['']   
    });
  }

  ngOnInit() {
    this.updateFormControls(); 
  }

  updateFormControls() {
    if (this.isLoginMode) {
      this.form.removeControl('username'); 
    } else {
      if (!this.form.contains('username')) {
        this.form.addControl('username', this.fb.control('', Validators.required)); 
      }
    }
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.form.value).subscribe(
        (response) => {
          this.closeDialog();
        },
        (error) => {
        }
      );
    } else {
      this.authService.signup(this.form.value).subscribe(
        (response) => {
          this.closeDialog();
        },
        (error) => {
        }
      );
    }
  }

  closeDialog() {
    this._dialogRef.close();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.updateFormControls(); 
  }
}
