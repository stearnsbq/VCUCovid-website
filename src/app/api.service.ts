import { Data } from './model/data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public loading = false;

  constructor(private http: HttpClient) {

  }

  public getAll() {
    return this.http.get<Data>('http://192.168.1.202:8084/api/v1');
  }

  public getCases() {
    return this.http.get('http://localhost:8084/v1/api/cases');
  }

  public getEmployeeCases() {
    return this.http.get('http://localhost:8084/api/v1/cases/employees');
  }


  public getStudentCases() {
    return this.http.get('http://192.168.1.202:8084/api/v1/cases/students');
  }

  public getIsolations() {
    return this.http.get('http://192.168.1.202:8084/api/v1/residential/isolations');
  }

  public getQuarantines() {
    return this.http.get('http://192.168.1.202:8084/api/v1/residential/quarantines');
  }

  public getStudentCaseByDate(year, month, day) {

  }


}
