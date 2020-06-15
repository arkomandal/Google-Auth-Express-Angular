import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  GATEWAY: string = '';

  constructor(private http: HttpClient) {
    this.GATEWAY = `http://localhost:3000`;
  }

  public authenticate(token) {
    return this.http.post(`${this.GATEWAY}/auth/google`, { token: token });
  }

}
