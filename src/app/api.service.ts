import { Data } from './model/data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public loading = false;

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<Data>('https://quinn50.dev/vcucovid/api/v1');
  }
}
