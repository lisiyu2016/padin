import { Component, OnInit, Input, OnDestroy } from '@angular/core';
declare var Highcharts: any;
import { CloudProject } from '@app/definitions';
import { Store } from '@ngrx/store';
import { IotModuleState } from '@app/iot/iot.module.defs';

@Component({
  selector: 'app-co2-widget',
  templateUrl: './co2-widget.component.html',
  styleUrls: ['./co2-widget.component.scss']
})
export class CO2WidgetComponent implements OnInit, OnDestroy {

  private ref = null;
  public data: any = {};
  @Input('project') public project: CloudProject = null;
  @Input('id') public id: any = null;

  public currentValue = 0;
  public highest: number;
  public lowest: number;
  public average = 0;

  constructor(
    private store: Store<IotModuleState>
  ) { }

  ngOnInit() {
    this.ref = this.store.select('iotModule').subscribe(({projects}) => {
      this.project = projects.find(x => +x.id === +this.id);
    });
  }
  ngOnDestroy () {
    this.ref.unsubscribe();
  }
}
