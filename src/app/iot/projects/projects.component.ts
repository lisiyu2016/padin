import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ILocation, DataSource, CloudProject } from '@app/definitions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { IotModuleState } from '@app/iot/iot.module.defs';
import { IotRequestsService } from '@app/iot/iot-requests.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements  OnInit, OnDestroy {

  public projects: Array<any> = [];
  public unconnected: Array<DataSource> = [];
  public locations: Array<ILocation> = [];
  private _ref1: any  = null;
  private _ref2 = null;
  constructor (
    private requests: IotRequestsService,
    public chRef: ChangeDetectorRef,
    private router: Router,
    private store: Store<IotModuleState>,
    private notification: NotificationService,
    private translate: TranslateService,

  ) {
   }

  ngOnInit() {
    this._ref1 = this.store.select('iotModule').subscribe(({projects}) => {
      this.projects = projects;
    });
    this._ref2 = this.store.select('iotModule').subscribe(({locations}) => {
      this.locations = (locations as Array<ILocation>);
    });
    this.store.select('iotModule').subscribe(({unconnectedSources}) => {
      this.unconnected = unconnectedSources;
    });
    this.requests.getProjects();
  }
  public FormatDate (value: Date) {
    if ( ! value ) {
      return 'unknown';
    }
    return `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`;
  }
  public FormatTemperature (value: number = 0) {
    return value.toFixed(2);
  }

  ngOnDestroy () {
    this._ref1.unsubscribe();
    this._ref2.unsubscribe();
  }

  public DeleteProject (project: CloudProject) {
    if (confirm( this.translate.get('Are you sure to delete this project?')['value'])) {
      this.requests.deleteProject(project.id);
      this.notification.InvokeProjectDelete(project);
      this.router.navigateByUrl('/projects');
    }
  }

  public FindLocationName (id: number): string {
    const location = this.locations.find(x => x.id === id);
    if (location) {
      return location.name;
    }
  }
}
