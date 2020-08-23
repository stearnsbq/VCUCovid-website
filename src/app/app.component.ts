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
  public studentCases: number;
  public employeeCases: number;
  public isolations: number;
  public quarantines: number;
  public negativeTestResults: number;
  public positiveTestResults: number;
  public showModal: boolean;

  constructor(public api: ApiService, private elementRef: ElementRef, public meta: Meta) {
    this.showModal = false;

    this.api.getAll().subscribe((all) => {
      this.studentCases = all.students[all.students.length - 1].value;
      this.employeeCases = all.employees[all.employees.length - 1].value;
      this.isolations = all.isolations[all.isolations.length - 1].value;
      this.quarantines = all.quarantines[all.quarantines.length - 1].value;
      this.negativeTestResults = all.negatives[all.negatives.length - 1].value;
      this.positiveTestResults = all.positives[all.positives.length - 1].value;

      this.meta.addTag({name: 'Student Cases', content: this.studentCases + ''});
      this.meta.addTag({name: 'Employee Cases', content: this.employeeCases + ''});
      this.meta.addTag({name: 'Student Isolations', content: this.isolations + ''});
      this.meta.addTag({name: 'Student Quarantines', content: this.quarantines + ''});
      this.meta.addTag({name: 'Negative Test Results', content: this.negativeTestResults + ''});
      this.meta.addTag({name: 'Positive Test Results', content: this.positiveTestResults + ''});

      this.studentCaseData = all.students;
      this.employeeCaseData = all.employees;
      this.isolationData = all.isolations;
      this.quarantineData = all.quarantines;
      this.positiveTestData = all.positives;
      this.negativeTestData = all.negatives;
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style[
      'background-image'
    ] = `url(vcucovid/assets/bg${Math.floor(Math.random() * 8) + 1}.png)`;
  }
}
