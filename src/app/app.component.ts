import { ApiService } from './api.service';
import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
declare let ga: any;


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




  constructor(public api: ApiService, private elementRef: ElementRef, public meta: Meta, public router: Router) {
    this.showModal = false;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });

    this.api.getAll().subscribe((all) => {
      this.studentCases = all.students[all.students.length - 1].value;
      this.employeeCases = all.employees[all.employees.length - 1].value;
      this.isolations = all.isolations[all.isolations.length - 1].value;
      this.quarantines = all.quarantines[all.quarantines.length - 1].value;
      this.negativeTestResults = all.negatives[all.negatives.length - 1].value;
      this.positiveTestResults = all.positives[all.positives.length - 1].value;
      this.prevalenceNegatives = all.prevalenceNegative[all.prevalenceNegative.length - 1].value;
      this.prevalencePositives = all.prevalencePositive[all.prevalencePositive.length - 1].value;
      this.totalStudents = all.totalStudents[all.totalStudents.length - 1].value;
      this.totalEmployees = all.totalEmployees[all.totalEmployees.length - 1].value;


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
