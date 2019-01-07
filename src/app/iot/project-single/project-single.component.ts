import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloudProject, CloudProjectType } from '@app/definitions';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/toPromise';
import { IResponse } from 'response-type';
import { error } from '@app/common';
import { NotificationService } from '@app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { IotModuleState } from '@app/iot/iot.module.defs';
import { IotRequestsService } from '@app/iot/iot-requests.service';
import { ActionsService } from '@app/ng5-basic/actions.service';

@Component({
  selector: 'app-project-single',
  templateUrl: './project-single.component.html',
  styleUrls: ['./project-single.component.scss']
})
export class ProjectSingleComponent implements OnInit, OnDestroy {

  public isRequesting = false;
  public response: IResponse<CloudProject> = null;
  public locations: Array<any> = [];
  public form: CloudProject = {
    type: CloudProjectType.TemperatureSensor,
    preferences: {},
  };

  public error = error;
  constructor(
    private route: ActivatedRoute,
    private store: Store<IotModuleState>,
    private router: Router,
    private actions: ActionsService,
    private requests: IotRequestsService,
    private notification: NotificationService,
    private translate: TranslateService,
  ) {
   }

  async ngOnInit() {
    Observable.combineLatest(
      this.store.select('iotModule'),
      this.route.params
    ).subscribe(([{projects}, params]) => {
       if (params.sourceId) {
        this.form.datasource = params.sourceId;
      }
      if ( ! params.id ) {
        return ;
      }
      this.form.id = params.id;
      const form = projects.find(dev => dev.id === +params.id);
      if (!form) {
        return;
      }
      this.form = Object.assign({}, form);
    }).unsubscribe();
    const project = await this.requests.getProject(this.form.id);
    if ( project ) {
      this.form = project;
    }
  }
  ngOnDestroy () {

  }
  
  public IsOpenBMC () {
    return +this.form.type === CloudProjectType.OpenBMC;
  }
  public IsTemperature () {
    return +this.form.type === CloudProjectType.TemperatureSensor;
  }
  public IsLamp () {
    return +this.form.type === CloudProjectType.LampBridge;
  }
  public IsHumidity () {
    return +this.form.type === CloudProjectType.HumiditySensor;
  }
  public IsCo2 () {
    return +this.form.type === CloudProjectType.CO2Sensor;
  }
  public async SubmitForm () {
    delete this.form.value;
    this.actions.scrollTop();
    this.isRequesting = true;
    const project = Object.assign({}, this.form);
    try {
      const response: IResponse<CloudProject> = await this.requests.PostProject(project);
      if (response.data && response.data.items && response.data.items[0]) {
        this.router.navigateByUrl('/projects');
        if (this.form.id) {
          this.notification.InvokeProjectUpdate(response.data.items[0]);
        } else {
          this.notification.InvokeProjectCreate(response.data.items[0]);
        }

      }
      this.response = response;
    } catch (error) {
      this.response = error;
    }
    this.isRequesting = false;
  }

  public DeleteProject () {
    if (confirm( this.translate.get('Are you sure to delete this project?')['value'])) {
      this.requests.deleteProject(this.form.id);
      this.notification.InvokeProjectDelete(this.form);
      this.router.navigateByUrl('/projects');
    }
  }
  public ProjectGeneralChange (data: any) {
    this.form = Object.assign(this.form, data);
  }
  public ProjectCustomizationChange (value) {
    this.form.preferences = value;
  }

}
