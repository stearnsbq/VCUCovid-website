import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
  ViewChild,
} from "@angular/core";
import * as ApexCharts from "apexcharts";
import * as moment from "moment";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.scss"],
})
export class GraphComponent implements OnInit {
  @Input() data: any[][];
  @Input() dataNames: string[];
  @Input() title: string;
  @Input() chartType: string;
  @ViewChild("chart", { static: true })
  chart_element;

  public chart: any;

  constructor() {
    this.title = "Graph";
    this.chartType = "area";
  }

  ngOnInit() {
    const series = this.data.map((value, index) => {
      return {
        name: this.dataNames[index],
        data: value.map((val) => {
          return { x: val.date, y: val.value };
        }),
      };
    });

    const options = {
      chart: {
        fontFamily:
          '"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
        type: "area",
        width: "100%",
        foreColor: "#211F1F",
        toolbar: {
          show: false,
        },
        //  background: '#FAFAFA'
      },
      colors: ["#FFBE0C", "#211F1F", "#58575A"],
      title: {
        text: this.title,
        floating: false,
      },
      markers: {
        size: 3,
      },
      series,
      xaxis: {
        type: "datetime",
        labels: {
          offsetX: -15,
          style: {
            fontSize: "10px",
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      legend: {
        position: "top",
      },
    };

    this.chart = new ApexCharts(this.chart_element.nativeElement, options);

    this.chart.render();
  }
}
