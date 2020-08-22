import { ApiService } from './api.service';
import { Component, AfterViewInit, ElementRef } from '@angular/core';

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
  public studentCases;
  public employeeCases;
  public isolations;
  public quarantines;
  public negativeTestResults;
  public positiveTestResults;

  constructor(private api: ApiService, private elementRef: ElementRef) {

    this.api.getAll().subscribe((all) => {
      this.studentCases = all.students[0].value;
      this.employeeCases = all.employees[0].value;
      this.isolations = all.isolations[0].value;
      this.quarantines = all.quarantines[0].value;
      this.negativeTestResults = all.negatives[0].value;
      this.positiveTestResults = all.positives[0].value;

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
    ] = `url(./assets/bg${Math.floor(Math.random() * 8) + 1}.png)`;
  }
}
