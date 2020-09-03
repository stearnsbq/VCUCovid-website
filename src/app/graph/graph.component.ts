import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ChartDataSets, ChartOptions, Chart, plugins } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-zoom';

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
  @Input() scale: string;
  @ViewChild('chart', { static: true })
  chart_element;

  public chart: any;
  public labels: any;

  constructor() {
    this.title = 'Graph';
    this.chartType = 'area';
    this.scale = 'linear';
  }

  private getMax(a) {
    return Math.floor(Math.max(
      ...a.map((e) => (Array.isArray(e) ? this.getMax(e) : e.value))
    ));
  }

  private getDigits(a) {
    a = Math.abs(a);
    return Math.log(a) * Math.LOG10E + 1 | 0;
  }

  ngOnInit(): void {
    const graphData: ChartDataSets[] = this.data.map((value, index) => {
      return {
        label: this.dataNames[index],
        data: value.map((val) => {
          return val.value;
        }),
        backgroundColor: this.colors[index],

        pointBackgroundColor: this.colors[
          index === this.colors.length - 1 ? index - 1 : index + 1
        ],
        fill: this.chartType === 'area' ? (index === 0 ? 1 : 'start') : false,
      };
    });

    this.labels = this.data[0].map((value) => {
      return value.date;
    });


    const max = Math.pow(10, this.getDigits(this.getMax(this.data)));


    this.chart = new Chart(this.chart_element.nativeElement, {
      type: this.chartType === 'area' ? 'line' : this.chartType,
      plugins: [ChartDataLabels],
      data: {
        labels: this.labels,
        datasets: graphData,
      },
      options: {
        scales: {
          yAxes: [
            {
              type: this.scale,
              ticks:
                this.scale === 'logarithmic'
                  ? {
                      min: 0,
                      max,
                      callback(value, index, values) {
                        if (
                          value === 0 ||
                          value === 1 ||
                          value === 10 ||
                          value === 100 ||
                          value === 1000 ||
                          value === 10000
                        ) {
                          return value;
                        }
                      },
                    }
                  : {},
            },
          ],
        },
        maintainAspectRatio: false,
        aspectRatio: 1,
        title: {
          display: true,
          text: this.title,
        },
        plugins: {
          datalabels: {
            align: 'top',
            offset: 1,
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
              rangeMin: {
                x: 0,
                y: 0
              }
            },
            zoom: {
              enabled: true,
              mode: 'x',
                rangeMin: {
                x: 0,
                y: 0
              }
            }
          }
        },
      },
    });
  }
}
