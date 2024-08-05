import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.signinForm.get('email'); }
  get password() { return this.signinForm.get('password'); }

  onSubmit() {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
      this.authService.authenticate({ email, password }).subscribe(
        response => {
          // Handle successful login, e.g., save the token and navigate to home page
          console.log('Login successful', response);
          this.authService.login(email, response.token);
          this.router.navigate(['/create-group']); // Navigate to home or other secured page
        },
        error => {
          // Handle login error, e.g., show an error message
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
      );
    }
  }
}
