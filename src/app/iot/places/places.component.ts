import { Component, OnInit, OnDestroy } from '@angular/core';
import { ILocation, CloudProject } from '@app/definitions';
import { ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { IotModuleState } from '@app/iot/iot.module.defs';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss',  '../checkbox-switch.scss']
})
export class PlacesComponent implements OnInit, OnDestroy {

  public locations: Array<ILocation> = [];
  public projects: Array<CloudProject> = [];

  constructor(
    public chRef: ChangeDetectorRef,
    private store: Store<IotModuleState>,
  ) {
    // Initialize the private variables
  }

  async ngOnInit() {
    this.store.select('iotModule').subscribe(({locations}) => {
      this.locations = locations;
    });
    this.store.select('iotModule').subscribe(({projects}) => {
      this.projects = projects;
    });
  }

  ngOnDestroy () {
    this.chRef.detach();
  }
  public findWidgets (projects, location: ILocation): Array<CloudProject> {
    return projects.filter(project => +project.location === +location.id);
  }

}
