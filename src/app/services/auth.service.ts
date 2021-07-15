import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredential } from '../models/user-credential';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = `http://localhost:8080/login`;

  constructor(private http: HttpClient) {}

  doLogin(user: UserCredential): Observable<any> {
    return this.http.post<any>(`${this.url}`, user, { observe: 'response' });
  }

  isTokenExists(): boolean {
    if (sessionStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  getToken(): string {
    return '' + sessionStorage.getItem('token');
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  logout(): void {
    sessionStorage.clear();
  }
}
