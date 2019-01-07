import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CloudProject } from '@app/definitions';
import { Store } from '@ngrx/store';
import { IResponse } from 'response-type';
import { error } from '@app/common';
import { IotModuleState } from '@app/iot/iot.module.defs';

@Component({
  selector: 'app-project-general-information',
  templateUrl: './project-general-information.component.html',
  styleUrls: ['./project-general-information.component.scss']
})
export class ProjectGeneralInformationComponent implements OnInit, OnDestroy {

  @Input('mode') public mode: 'edit' | 'new' = 'new';
  @Input('response') public response: IResponse<CloudProject> = null;
  @Output('onChange') public onChange: EventEmitter<any> = new EventEmitter();
  @Input('project') public set project (value: CloudProject) {
    this.form = Object.assign({}, value);
  }
  private ref = null;
  public locations: Array<any> = [];
  public form: any = {};
  public error = error;

  constructor (
    private store: Store<IotModuleState>,
  ) { }


  ngOnInit() {
    this.ref = this.store.select('iotModule').subscribe(({locations}) => {
      this.locations = locations;
    });

  }

  public SubmitChange () {
	console.log("SubmitChange");
    this.onChange.emit(this.form);
  }
  ngOnDestroy () {
    if ( this.ref ) {
      this.ref.unsubscribe ();
    }
  }
}
