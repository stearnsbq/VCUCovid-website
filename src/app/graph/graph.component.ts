import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ChartDataSets, ChartOptions, Chart, plugins } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @Input() data: any[][];
  @Input() dataNames: string[];
  @Input() title: string;
  @Input() chartType: string;
  @Input() colors: string[];
  @ViewChild('chart', { static: true })
  chart_element;

  public chart: any;
  public labels: any;

  constructor() {
    this.title = 'Graph';
    this.chartType = 'area';
  }

  ngOnInit(): void {
    const graphData: ChartDataSets[] = this.data.map((value, index) => {
      return {
        label: this.dataNames[index],
        data: value.map((val) => {
          return val.value;
        }),
        backgroundColor: this.colors[index],
        pointBackgroundColor:
        this.colors[index === this.colors.length - 1 ? index - 1 : index + 1],
        fill: index === 0 ? 'origin' : -index + '',
      };
    });

    this.labels = this.data[0].map((value) => {
      return value.date;
    });

    this.chart = new Chart(this.chart_element.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: graphData,
      },
      options: {
        scales: {
          yAxes: [
            {
              stacked: true,
            }
          ],
          xAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    });
  }
}
