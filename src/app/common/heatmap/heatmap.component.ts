import { Component, OnInit } from '@angular/core';
import { Chart, DatasetChartOptions, ChartOptions, ChartType, Colors } from 'chart.js';
import { AnyObject } from 'chart.js/dist/types/basic';
import { color } from 'chart.js/helpers';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  chartContainer: any
  constructor() {
    Chart.register(MatrixController, MatrixElement)

  }
  ngOnInit(): void {
    this.chartContainer = document.getElementById('heatmap')
    var chart = new Chart(this.chartContainer.getContext('2d'),
      {
        type: 'matrix',
        data:
        {
          datasets: [{
            label: 'People Entry',
            data: [
              { x: 1, y: 1, v: 11 },
              { x: 1, y: 2, v: 22 },

              { x: 1, y: 3, v: 43 },
              { x: 1, y: 4, v: 63 },
              { x: 1, y: 5, v: 13 },
              { x: 1, y: 6, v: 23 },
              { x: 1, y: 7, v: 63 },

              { x: 2, y: 1, v: 21 },
              { x: 2, y: 2, v: 12 },
              { x: 2, y: 3, v: 63 },
              { x: 2, y: 4, v: 23 },
              { x: 2, y: 5, v: 13 },
              { x: 2, y: 6, v: 3 },
              { x: 2, y: 7, v: 33 },

              { x: 3, y: 1, v: 31 },
              { x: 3, y: 2, v: 72 },
              { x: 3, y: 3, v: 13 },
              { x: 3, y: 4, v: 53 },
              { x: 3, y: 5, v: 63 },
              { x: 3, y: 6, v: 33 },
              { x: 3, y: 7, v: 23 },

              { x: 4, y: 1, v: 11 },
              { x: 4, y: 2, v: 12 },
              { x: 4, y: 3, v: 63 },
              { x: 4, y: 4, v: 13 },
              { x: 4, y: 5, v: 63 },
              { x: 4, y: 6, v: 33 },
              { x: 4, y: 7, v: 23 },

              { x: 5, y: 1, v: 61 },
              { x: 5, y: 2, v: 22 },
              { x: 5, y: 3, v: 43 },
              { x: 5, y: 4, v: 13 },
              { x: 5, y: 5, v: 63 },
              { x: 5, y: 6, v: 33 },
              { x: 5, y: 7, v: 23 },

              { x: 6, y: 1, v: 21 },
              { x: 6, y: 2, v: 32 },
              { x: 6, y: 3, v: 23 },
              { x: 6, y: 4, v: 13 },

              { x: 7, y: 1, v: 41 },
              { x: 7, y: 2, v: 12 },
              { x: 7, y: 3, v: 13 },
              { x: 7, y: 4, v: 13 },
              { x: 7, y: 5, v: 63 },
              { x: 7, y: 6, v: 33 },
              { x: 7, y: 7, v: 23 },

              { x: 8, y: 1, v: 41 },
              { x: 8, y: 2, v: 12 },
              { x: 8, y: 3, v: 13 },
              { x: 8, y: 4, v: 13 },
              { x: 8, y: 5, v: 63 },
              { x: 8, y: 6, v: 33 },
              { x: 8, y: 7, v: 23 }


            ],
            backgroundColor(context: any) {
              const value = context.dataset.data[context.dataIndex].v;
              const alpha = (value - 5) / 40;
              return color('#5CABFF').alpha(alpha).rgbString();
            },
            borderColor(context: any) {
              const value = context.dataset.data[context.dataIndex].v;
              const alpha = (value - 5) / 40;
              return color('#5CABFF').alpha(alpha).rgbString();
            },
            borderWidth: 1,
            width: ({ chart }) => (chart.chartArea || {}).width / 8- 1,
            height: ({ chart }) => (chart.chartArea || {}).height / 7- 1
          }]
        },
        options: {
          plugins: {
            // legend: false,
            tooltip: {
              callbacks: {
                title() {
                  return '';
                },
                label(context:any) {
                  const v = context.dataset.data[context.dataIndex];
                  return ['x: ' + v.x, 'y: ' + v.y, 'v: ' + v.v];
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                stepSize: 1
              },
              grid: {
                display: false
              }
            },
            y: {
              offset: true,
              ticks: {
                stepSize: 1
              },
              grid: {
                display: false
              }
            }
          }
        }





      }
    )

  }

}
