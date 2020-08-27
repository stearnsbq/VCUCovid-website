import { ApiService } from './api.service';
import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'vcu-covid-app';
  public data;
  public studentCaseData;
  public employeeCaseData;
  public isolationData;
  public quarantineData;
  public positiveTestData;
  public negativeTestData;
  public prevalencePositiveData;
  public prevalenceNegativeData;
  public studentCases: number;
  public employeeCases: number;
  public isolations: number;
  public quarantines: number;
  public negativeTestResults: number;
  public positiveTestResults: number;
  public prevalencePositives: number;
  public prevalenceNegatives: number;
  public totalStudents: number;
  public totalEmployees: number;
  public showModal: boolean;




  constructor(public api: ApiService, private elementRef: ElementRef, public meta: Meta) {
    this.showModal = false;




    this.api.getAll().subscribe((all) => {
      this.studentCases = all.students[0].value;
      this.employeeCases = all.employees[0].value;
      this.isolations = all.isolations[0].value;
      this.quarantines = all.quarantines[0].value;
      this.negativeTestResults = all.negatives[0].value;
      this.positiveTestResults = all.positives[0].value;
      this.prevalenceNegatives = all.prevalenceNegative[0].value;
      this.prevalencePositives = all.prevalencePositive[0].value;
      this.totalStudents = all.totalStudents[0].value;
      this.totalEmployees = all.totalEmployees[0].value;


      this.studentCaseData = all.students;
      this.employeeCaseData = all.employees;
      this.isolationData = all.isolations;
      this.quarantineData = all.quarantines;
      this.positiveTestData = all.positives;
      this.negativeTestData = all.negatives;
      this.prevalenceNegativeData = all.prevalenceNegative;
      this.prevalencePositiveData = all.prevalencePositive;
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style[
      'background-image'
    ] = `url(vcucovid/assets/bg${Math.floor(Math.random() * 8) + 1}.png)`;
  }
}
