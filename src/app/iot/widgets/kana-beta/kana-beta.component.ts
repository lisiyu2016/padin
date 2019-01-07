import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
declare var Highcharts: any;
import { CloudProject } from '@app/definitions';
import { Store } from '@ngrx/store';
import { IotModuleState } from '@app/iot/iot.module.defs';
import { RealtimeService } from '@app/iot/realtime.service';

@Component({
  selector: 'app-kana-beta',
  templateUrl: './kana-beta.component.html',
  styleUrls: ['./kana-beta.component.scss']
})
export class KanaBetaComponent implements OnInit, AfterViewInit {

  public chartName = 'live-tempreture';
  public data: any = {};
  @Input('project') public project: CloudProject = null;
  @Input('id') public id: any = null;

  public chart: any;
  public currentValue = 0;
  public highest: number;
  public lowest: number;
  public average = 0;

  constructor(
    private store: Store<IotModuleState>,
    private realtime: RealtimeService,
  ) { }

  public onChange (pin, value) {
    this.realtime.ChangeComplexOutputValue(this.project.datasource, pin, value);
  }

  public isChecked(pin: string) {
    const { project } = this;
    if ( !project || !project.value || project.value[pin] !== true) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.store.select('iotModule').subscribe(({projects}) => {
      this.project = projects.find(x => +x.id === +this.id);
    });
  }

  ngAfterViewInit () {

  }

}
