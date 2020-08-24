import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
  ViewChild,
} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import * as moment from 'moment';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @Input() data: any;
  @Input() title: string;
  @Input() chartType: string;
  @ViewChild('chart', { static: true })
  chart_element;

  public chart: any;

  constructor() {

    this.title = 'Graph';
    this.chartType = 'area';

  }

  ngOnInit() {

    this.data.sort((a, b) =>
    Date.parse(a.date) > Date.parse(b.date) ? 1 : -1
  );
    const options = {
    chart: {
      type: 'area',
      width: '100%',
      foreColor: '#211F1F',
      toolbar: {
        show: false,
      },
    //  background: '#FAFAFA'
    },
    colors: ['#FFBE0C', '#211F1F', '#58575A'],
    title: {
      text: this.title
    },
    markers: {
      size: 3,
    },
    series: [
      {
        data: this.data.map((value) => {
          return {x: value.date, y: value.value}
        }),
      }
    ],
    xaxis: {
      type: 'datetime',
      labels: {
        offsetX: -15,
        style: {
          fontSize: '10px'
        }
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
  };

    this.chart = new ApexCharts(this.chart_element.nativeElement, options);

    this.chart.render();


  }


}
