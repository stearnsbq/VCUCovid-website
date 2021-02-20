import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Response} from './model/response'


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public loading = false;

  public apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiUrl;
  }

  public get(what: string, filter?: string){
    let params = new HttpParams();


    if(filter){
      params = params.set("filter", filter);
    }


    return this.http.get<Response>(this.apiURL + `/${what}`, {params})
  }




}
