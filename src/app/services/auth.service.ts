import { Inject, Injectable, afterNextRender } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

import { map } from 'rxjs';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authToken?: string;

  private tokenKey: string = 'authToken'

  private API_URL = environment.api_url + '/api/v1/auth/';

  currentUser?: any;

  loginState?: boolean;

 

  

  private _saveToStorage(key: string, value: any){
    localStorage.setItem(key, value);
  }


  saveAuthToken(): void{
    this._saveToStorage(this.tokenKey, this.authToken);
  }


  isLoggedIn(): boolean{
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) :  null;
  }

  getCurrentUser(cb?: () => void){
    this.getProfile().subscribe((res) => {
      if(res['status'] == 'success'){
        this.currentUser = res.data!['user'];
        if (cb) cb();
      }
    })
  }

  login(data: any): Observable<any>{
    return  this._http.post<any>(this.API_URL + 'user-login', data)
                                .pipe(
                                  map((res) => {
                                    return res;
                                  })
                                )
  }

  getProfile(): Observable<any>{
    return this._http.get<any>(this.API_URL + '/my-profile')
                              .pipe(
                                map((res) => {
                                  return res;
                                })
                              )
  }

  constructor(private _http: HttpClient) { }

  registerUser(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + 'register', data)
                                .pipe(
                                  map((res) =>{
                                    return res;
                                  })
                                )
  }


  logout(){
    localStorage.removeItem(this.tokenKey);
  }
}
