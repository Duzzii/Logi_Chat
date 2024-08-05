import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private UserLoggedIn: boolean = false;
  private loggedInEmail: string = '';
  private userId: number | null = null;
  private token: string | null = null;
  authChanged = new Subject<boolean>();

  private authStatusListener = new BehaviorSubject<boolean>(false);

  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  login(email: string, token: string): void {
    this.UserLoggedIn = true;
    this.token = token;
    this.loggedInEmail = email;
    localStorage.setItem('loggedInUserEmail', email);
    localStorage.setItem('token', token);
    this.userId = this.extractUserIdFromToken(token);
    this.authStatusListener.next(true);
  }

  logout(): void {
    this.UserLoggedIn = false;
    this.loggedInEmail = '';
    this.token = null;
    this.userId = null;
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('token');
    this.authStatusListener.next(false);
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  getIsLoggedIn(): boolean {
    return this.UserLoggedIn;
  }

  getLoggedInUserEmail(): string {
    return this.loggedInEmail;
  }

  initAuth(): void {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    const token = localStorage.getItem('token');
    if (userEmail && token) {
      this.UserLoggedIn = true;
      this.loggedInEmail = userEmail;
      this.token = token;
      this.userId = this.extractUserIdFromToken(token);
      this.authStatusListener.next(true);
    }
  }

  getUserId(): number | null {
    return this.userId;
  }

  private extractUserIdFromToken(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  resetPassword(email: string, newPassword: string): Observable<void> {
    const resetPasswordUrl = `${this.baseUrl}/reset-password`;
    const body = { email, newPassword };
    return this.http.put<void>(resetPasswordUrl, body);
  }

  // New methods for login and registration requests to backend

  register(data: { username: string, email: string, password: string, confirmPassword: string }): Observable<any> {
    const registerUrl = `${this.baseUrl}/register`;
    return this.http.post<any>(registerUrl, data);
  }

  authenticate(credentials: { email: string, password: string }): Observable<any> {
    const loginUrl = `${this.baseUrl}/authenticate`;
    return this.http.post<any>(loginUrl, credentials);
  }
}
