import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const BASE_URL = "http://localhost:8080"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(registerRequest: any): Observable<any> {
    return this.http.post(BASE_URL+'/api/auth/register', registerRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL+"/api/auth/login", loginRequest);
  }
}
