import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

import { map } from 'rxjs';

import { provideHttpClient, withFetch } from '@angular/common/http';

providers : [provideHttpClient(withFetch())]

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {


  private API_URL = environment.api_url + '/api/v1/vehicle/';

  constructor(private _http: HttpClient) { }

  getAllVehicles(): Observable<any>{
    return this._http.get<any>(this.API_URL + 'all_vehicles')
                              .pipe(
                                map((res) =>{
                                  return res;
                                })
                              )
  }


  getOneVehicle(id: number): Observable<any>{
    return this._http.get<any>(this.API_URL + `one_vehicle/${id}`)
                              .pipe(
                                map((res) => {
                                  return res;
                                })
                              )
  }


  createVehicle(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/create_vehicle', data )
                              .pipe(
                                map((res) =>{
                                  return res;
                                })
                              )
  }


  editVehicle(id:number, data: any): Observable<any>{
    return this._http.patch<any>(this.API_URL + `edit_vehicle/${id}`, data )
                              .pipe(
                                map((res) =>{
                                  return res;
                                })
                              )
  }

  deleteVehicle(id:number): Observable<any>{
    return this._http.delete<any>(this.API_URL + `/delete_vehicle/${id}` )
                              .pipe(
                                map((res) =>{
                                  return res;
                                })
                              )
  }



  rentVehicle(id:number, data: any): Observable<any>{
    return this._http.patch<any>(this.API_URL + `rent_vehicle/${id}`, data)
                                .pipe(
                                  map((res) => {
                                  return res;
                                })
                                )
  }

  updateRental(data: any): Observable<any>{
    return this._http.patch<any>(this.API_URL + `update_rental`, data)
                                .pipe(
                                  map((res) => {
                                    return res;
                                  })
                                )
  }





  makeSearchVehicles(data: any): Observable<any>{
    return this._http.get<any>(this.API_URL + `searchbymake/${data}`)
                              .pipe(
                                map((res) =>{
                                  return res;
                                })
                              )
  }


  categorySearchVehicles(data: any): Observable<any>{
    return this._http.get<any>(this.API_URL + `searchbycategory/${data}`)
                              .pipe(
                                map((res) =>{
                                  return res;
                                })
                              )
  }


  priceSearchVehicles(data: any): Observable<any>{
    return this._http.get<any>(this.API_URL + `searchbyprice/${data}`)
                              .pipe(
                                map((res) =>{
                                  return res;
                                })
                              )
  }


  
  carUserGone(id:number,data: any): Observable<any>{
    return this._http.patch<any>(this.API_URL + `vehicleuserdelete`, data)
                              .pipe(
                                map((res) =>{
                                  return res;
                                })
                              )
  }








}






