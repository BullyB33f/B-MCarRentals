import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

import { map } from 'rxjs';

import { provideHttpClient, withFetch } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private API_URL = environment.api_url + '/api/v1/user/'; 



  constructor(private _http: HttpClient) { }

  allUsers(): Observable<any>{
    return this._http.get<any>(this.API_URL + 'all_users')
                              .pipe(
                                map((res) => {
                                  return res;
                                })
                              )
  }

  oneUser(id: number): Observable<any>{
    return this._http.get<any>(this.API_URL + `one_user/${id}`)
                              .pipe(
                                map((res) => {
                                  return res;
                                })
                              )
  }

 editUser(id:number, data: any): Observable<any>{
    return this._http.patch<any>(this.API_URL + `edit_user/${id}`, data)
                                .pipe(
                                  map((res) => {
                                    return res;
                                  })
                                )
  }


  userRentVehicle(id:number, data:any): Observable<any>{
    return this._http.patch<any>(this.API_URL + `/user_rent`, data)
                                .pipe(
                                  map((res) => {
                                    return res;
                                  })
                                )
  }

  getUserVehicle(id:number): Observable<any>{
    return this._http.get<any>(this.API_URL + `user_vehicle/${id}`)
                              .pipe(
                                map((res) => {
                                  return res;
                                })
                              )
  }

  deleteUser(id:number): Observable<any>{
    return this._http.delete<any>(this.API_URL + `delete_user/${id}`)
                                  .pipe(
                                    map((res) => {
                                      return res;
                                    })
                                  )
  }

  userCarDelete(id: number, data: any): Observable<any>{
    return this._http.patch<any>(this.API_URL + `usercardelete`, data)
                                .pipe(
                                  map((res) => {
                                    return res;
                                  })
                                )
  }

}
