import { Injectable } from '@angular/core';
import {
  CloudProject,
  ICloudProjectDailyHistory,
  ILocation
 } from '@app/definitions';
import 'rxjs/add/observable/of';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { IotMockService } from './iot-mocks.service';
import { IResponse } from 'response-type';
import { GetNetworkError, IsSuccessEntity, GetUrl } from '@app/common';
import 'rxjs/add/operator/toPromise';
import { IotModuleState } from '@app/iot/iot.module.defs';
import { random } from '@lodash';

declare var io: any;

@Injectable()
export class IotRequestsService {
  constructor(
    private mocks: IotMockService,
    private store: Store<IotModuleState>,
    private http: HttpClient,
  ) { }

  public getLocations() {
    this.http.get(GetUrl('locations')).subscribe(
      (response: any) => {
        const collections = response.data.items;
        for (const item of collections) {
          this.store.dispatch({
            type: 'UPDATE_LOCATION',
            payload: item
          });
        }
      },
      (response) => {
      }
    );
  }
  public getUnconnected () {
    this.http.get(GetUrl('unconnected')).subscribe(
      (response: any) => {
        const collections = response.data.items;
        for (const item of collections) {
          this.store.dispatch({
            type: 'UPDATE_UNCONNECTED_DATA_SOURCE',
            payload: item
          });
        }
      },
      (response: any) => {
      },
    );
  }

  public async getProject (id: number) {
    try {
      const response: IResponse<CloudProject> = await (this.http.get(GetUrl('project/' + id)).toPromise());
      const collections = response.data.items;
      for (const item of collections) {
        this.store.dispatch({
          type: 'UPDATE_PROJECT',
          payload: item
        });
      }
      return collections[0];
    } catch (error) {

    }
  }
  public getProjects () {
    this.http.get(GetUrl('projects')).subscribe(
      (response: any) => {
        const collections = response.data.items;
        for (const item of collections) {
          this.store.dispatch({
            type: 'UPDATE_PROJECT',
            payload: item
          });
        }
      },
      (response: any) => {
      },
    );
  }

  public async GetProjectDayHistory(id: number, date: Date): Promise<IResponse<number>> {
    const url = GetUrl('projects/day-history/' + date + '/' + id);
    const ref = this.http.get(url).toPromise();
    try {
      const response: IResponse<number> = await ref;
      return response;
    } catch (error) {
      if (error.name === 'HttpErrorResponse') {
        return GetNetworkError();
      }
      return error;
    }
  }

  public async getProjectDailyHisotry (id: number): Promise<IResponse<ICloudProjectDailyHistory>> {
    const url = GetUrl('projects/daily-history/' + id);
    const ref = this.http.get(url).toPromise();
    try {
      const response: IResponse<ICloudProjectDailyHistory> = await ref;
      return response;
    } catch (error) {
      if (error.name === 'HttpErrorResponse') {
        return GetNetworkError();
      }
      return error;
    }
  }


  public async PostProject (project: CloudProject): Promise<IResponse<CloudProject>> {
    const ref = this.http.post(GetUrl('project') , project).toPromise();
    try {
      const response: IResponse<CloudProject> = await ref;
      if (response && response.data && response.data.items && response.data.items[0]) {
        const $project = response.data.items[0];
        if ($project) {
          this.store.dispatch({
            type: 'UPDATE_PROJECT',
            payload: $project
          });
          this.store.dispatch({
            type: 'CLEAR_UNCONNECTED_SOURCE',
            payload: $project.datasource
          });
        }
      }
      return response;
    } catch (error) {
      if (error.name === 'HttpErrorResponse') {
        return GetNetworkError();
      }
      return error;
    }
  }

  public async PostLocation (location: ILocation): Promise<IResponse<ILocation>> {
    const ref = this.http.post(GetUrl('location') , location).toPromise();
    try {
      const response: IResponse<ILocation> = await ref;
      if (IsSuccessEntity(response)) {
        const $location = response.data.items[0];
        if (! $location.id) {
          $location.id = random(1000, 999999);
        }
        if ($location) {
          this.store.dispatch({
            type: 'UPDATE_LOCATION',
            payload: $location
          });
        }
      }
      return response;
    } catch (error) {
      if (error.name === 'HttpErrorResponse') {
        return GetNetworkError();
      }
      return error;
    }
  }
  async deleteLocation (id: number ) {
    const ref = this.http.delete(GetUrl('location/' + id)).toPromise();
    try {
      const response: IResponse<ILocation> = await ref;
      if (IsSuccessEntity(response)) {
        const $location = response.data.items[0];
        if (! $location.id) {
          $location.id = random(1000, 999999);
        }
        if ($location) {
          this.store.dispatch({
            type: 'DELETE_LOCATION',
            payload: id
          });
        }
      }
      return response;
    } catch (error) {
      if (error.name === 'HttpErrorResponse') {
        return GetNetworkError();
      }
      return error;
    }
  }
  async deleteProject (id: number ) {
    const ref = this.http.delete(GetUrl('project/' + id)).toPromise();
    try {
      const response: IResponse<ILocation> = await ref;
      if (IsSuccessEntity(response)) {
        const $location = response.data.items[0];
        if (! $location.id) {
          $location.id = random(1000, 999999);
        }
        if ($location) {
          this.store.dispatch({
            type: 'DELETE_PROJECT',
            payload: id
          });
        }
      }
      return response;
    } catch (error) {
      if (error.name === 'HttpErrorResponse') {
        return GetNetworkError();
      }
      return error;
    }
  }
  async getProjectToken (): Promise<IResponse<any>> {
    return await this.http.get(GetUrl('projects/token')).toPromise();
  }

  async changeComplexBoardOutput (dataSourceId, pin, value): Promise<IResponse<any>> {
    const data = {
      dataSourceId, pin, value
    };
    return await this.http.post(GetUrl('projects/complex-terminal'), data).toPromise();
  }

  async createHash ({description}): Promise<IResponse<any>> {
    const data = {
      description
    };
    return await this.http.post(GetUrl('hashtable'), data).toPromise();
  }

}
