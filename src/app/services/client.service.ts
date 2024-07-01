import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Client} from "../models/Client.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AuthService} from "../../@core/auth/auth.service";

@Injectable({
  providedIn: 'root'

})

export class ClientService {
  public endpoint='Clients'
  constructor(private http : HttpClient, private _authService: AuthService) { }
  // getAllClient(){
  //   // Récupérer le jeton d'authentification de authService
  //   // const token = this._authService.getToken();
  //
  //   // Ajouter le jeton d'authentification dans l'en-tête Authorization
  //   // const headers = new HttpHeaders({
  //   //   'Authorization': `Bearer ${token}`
  //   // });
  //
  //   // Utiliser les options de requête pour passer les en-têtes avec la requête HTTP
  //   // const requestOptions = {
  //   //   headers: headers
  //   // };
  //
  //   return this.http.get<any>(`${environment.apiURL}/${this.endpoint}/get-clients`)
  // }
  // uploadClient(file : File){
  //   return this.http.post(`${environment.apiURL}/upload`,file)
  // }
  getAllClient(pageNumber: number, pageSize: number) {
    //const token = this._authService.getAuthToken();
    /*const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });*/

    //const requestOptions = { headers: headers };
    return this.http.get<any>(`${environment.apiURL}/${this.endpoint}/get-clients?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  uploadClient(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      // HttpClient sets the Content-Type header automatically for FormData
    });

    return this.http.post<any>(`${environment.apiURL}/${this.endpoint}/upload`, formData, { headers });
  }
}
