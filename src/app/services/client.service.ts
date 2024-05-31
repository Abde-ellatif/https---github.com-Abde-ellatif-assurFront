import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../models/Client.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http : HttpClient) { }
  getAllClient(){
    return this.http.get<any>(`${environment.apiURL}/get-clients`)
  }
  uploadClient(client:Client[]){
    return this.http.post(`${environment.apiURL}/upload`,client)
  }
}
