import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password, confirmPassword } = this.registerForm.value;
      this.authService.register({ username, email, password, confirmPassword }).subscribe(
        response => {
          // Handle successful registration
          this.authService.login(email, response.token);
          console.log('Registration successful', response);
          this.router.navigate(['/create-group']); // Navigate to sign-in page after successful registration
        },
        error => {
          // Handle registration error
          console.error('Registration failed', error);
          this.errorMessage = error.error.message || 'Registration failed. Please try again.';
        }
      );
    }
  }
}
