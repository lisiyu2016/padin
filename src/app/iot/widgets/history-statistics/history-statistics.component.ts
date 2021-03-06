import { Component, OnInit, Input } from '@angular/core';
import { CloudProject, ICloudProjectDailyHistory } from '@app/definitions';
import { IotRequestsService } from '@app/iot/iot-requests.service';
import { GlobalizationService } from '@app/ng5-basic/globalization.service';
declare var Highcharts: any;

interface IComponentHistory extends ICloudProjectDailyHistory {
  status: 'up' | 'down';
  changeRate: string;
}
@Component({
  selector: 'app-history-statistics',
  templateUrl: './history-statistics.component.html',
  styleUrls: ['./history-statistics.component.scss']
})
export class HistoryStatisticsComponent implements OnInit {
  @Input('project') public project: CloudProject = null;
  public dailyHistory: Array<IComponentHistory> = [];
  public currentData: Array<any>;
  public activeIndex = 0;
  drawChart(is_reversed?: boolean) {
    Highcharts.chart('history-statistics', {
      chart: {
        events: {
          redraw: function () {
            const self = this;
            setTimeout(function () {
              self.reflow();
            }, 10);
          }
        },
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      yAxis: {
        title: {
          text: null,
        },
        labels: {
          enabled: false
        },
        gridLineColor: '#f5f5f5'
      },
      xAxis: {
        reversed: (is_reversed === undefined) ?
          this.globalization.getLayoutDirection() === 'ltr' ? false : true :
          (is_reversed) ? true : false
      },
      legend: {
        layout: 'horizontal',
        align: 'left',
        verticalAlign: 'top',
      },
      tooltip: {
        useHTML: true
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 1
        }
      },
      series: [{
        name: 'Centigrade',
        data: this.currentData,
        type: 'spline',
        dashStyle: 'ShortDash',
        showInLegend: false,
        marker: {
          enabled: false,
        }
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  }

  constructor(
    private requests: IotRequestsService,
    private globalization: GlobalizationService
  ) {
    globalization.layoutDirectionEmitter.subscribe(direction => {
      this.drawChart(true);
    });
   }

  async ngOnInit() {
    await this.GetProject(this.project.id);
    if (!this.dailyHistory || !this.dailyHistory.length) {
      return ;
    }
    this.fetchChart(this.dailyHistory[0].date);
  }

  private CalculateChangeRate(items: Array<ICloudProjectDailyHistory>): Array<IComponentHistory> {

    return items.map((item: IComponentHistory, i) => {
      if (items.length - 1 > i) {
        const currentValue = item.average;
        const nextValue = items[i + 1].average;
        if (currentValue > nextValue) {
          item.status = 'up';
          item.changeRate = Math.abs(((nextValue - currentValue) / currentValue) * 100).toFixed(1);
        } else {
          item.status = 'down';
          item.changeRate = Math.abs(((currentValue - nextValue) / nextValue) * 100).toFixed(1);
        }
      }
      return item;
    }) as Array<IComponentHistory>;
  }
  private async GetProject(id: number) {
    try {
      const response = await this.requests.getProjectDailyHisotry(id);
      this.dailyHistory = this.CalculateChangeRate(response.data.items);
    } catch (error) {

    }
  }
  private async GetDayHistory(id: number, date: Date): Promise<number[]> {
    try {
      const response = await this.requests.GetProjectDayHistory(id, date);
      return response.data.items;
    } catch (error) {
    }
  }
  async setChart(index: number, date: Date) {
    if (this.activeIndex !== index) {
      this.activeIndex = index;
      this.fetchChart(date);
    }
  }
  public async fetchChart(date: Date) {
    const data = await this.GetDayHistory(this.project.id, date);
    this.currentData = data;
    this.drawChart();
  }
}
