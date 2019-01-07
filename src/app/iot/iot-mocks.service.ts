import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { IResponse, IResponseErrorItem } from 'response-type';
import { ILocation, CloudProject, ICloudProjectDailyHistory, DataSource } from '@app/definitions';
import { random, times } from '@lodash';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/delay';
import { handleRoute, urlMatch, API } from '@app/common';
import { IotSvgService } from '@services/iot-svg/iot-svg.service';
import { IotProjects } from './iot-mocks';
const projects = IotProjects;
const validateLocation = (location: ILocation) => {
  const errors: Array<IResponseErrorItem> = [];
  if (!location.name) {
    errors.push({
      message: 'Please provide a name for location',
      location: 'name'
    });
  }
  if (!location.level) {
    errors.push({
      message: 'Please select a level',
      location: 'level'
    });
  }
  if (!location.icon) {
    errors.push({
      message: 'Please select an icon for location',
      location: 'icon'
    });
  }
  return errors;
};

@Injectable()
export class IotMockService {

  public handleRoute = handleRoute.bind(this);
  public urlMatch = urlMatch.bind(this);
  public routes = {
    [API.get('locations')]: 'getLocations',
    [API.get('projects/daily-history/:id')]: 'GetProjectDailyHistory',
    [API.get('projects/token')]: 'getProjectsToken',
    [API.get('projects/day-history/:date/:id')]: 'GetProjectDayHistory',
    [API.get('project/:id')]: 'getProject',
    [API.get('projects')]: 'getProjects',
    [API.get('unconnected')]: 'getUnconnected',
    [API.post('project')]: 'postProject',
    [API.post('location')]: 'postLocation',
    [API.delete('location/:id')]: 'deleteLocation',
    [API.delete('project/:id')]: 'deleteProject',
  };

  constructor (
    private translate: TranslateService,
  ) {}

  public getLocations (): IResponse<any> {
    return {
      data: {
        items: [
          {
            id: 1,
            name: 'Kitchen',
            'icon': IotSvgService.kitchen,
            level: '2',
            temperatureProject: 1
          },
          {
            id: 2,
            name: 'Bathroom',
            'icon': IotSvgService.pathtub,
            level: '3',
            temperatureProject: 2
          },
          {
            id: 3,
            name: 'Master bedroom',
            'icon': IotSvgService.masterBedroom,
            level: '2',
            temperatureProject: 1
          },
        ]
      }
    };
  }

  public GetProjectDayHistory(req: HttpRequest<any>): IResponse<number> {
    return {
      data: {
        items: times(24 , () => random (10, 30)),
      }
    };
  }

  public deleteRole (req: HttpRequest<any>): IResponse<any> {
    return {
      data: {
        items: [
          {
          }
        ]
      }
    };
  }
  public getUnconnected (req: HttpRequest<any>): IResponse<DataSource> {
    return {
      data: {
        items: [
          {
            dataSourceId: 'project-36',
            date: new Date(),
            value: 22
          }
        ]
      }
    };
  }
  public getProjects (): IResponse<CloudProject> {
    return {
      data: {
        items: projects
      }
    };
  }
  public getProject (req: HttpRequest<any> , params): IResponse<CloudProject> {
    const id = req.url.split('/').reverse()[0];
    return {
      data: {
        items: projects.filter(project => project.id === +id)
      }
    };
  }

  public postProject( req: HttpRequest<any> ): IResponse<CloudProject> {
    const project: CloudProject = req.body;
    if (! project.id) {
      project.id = random(1000, 999999);
    }
    const validations = ProjectValidator(project);
    if (validations.length) {
      return {
        error: {
          message: 'Project cannot be created. Please currect the fields are highlighted',
          errors: validations,
          code: 34
        }
      };
    }
    return {
      data: {
        items: [
          project
        ]
      }
    };
  }
  public postLocation(req: HttpRequest<any>): IResponse<ILocation> {
    const location: ILocation = req.body;
    if ( ! location.id) {
      location.id = random(100, 9999);
    }
    if (validateLocation(location).length) {
      return {
        error: {
          message: 'Cannot create a project. Please fix the following issues',
          code: 294,
          errors: validateLocation(location)
        }
      };
    }
    return {
      data: {
        items: [
          {
            icon: location.icon,
            id: location.id,
            name: location.name,
            level: location.level,
            temperatureProject: location.temperatureProject
          }
        ]
      }
    };
  }

  public GetProjectDailyHistory (req: HttpRequest<any>): IResponse<ICloudProjectDailyHistory> {
    // const id = req.body.id;
    return {
      data: {
        items: [
          {
            date: new Date('2018-09-10'),
            average: 33.5
          },
          {
            date: new Date('2018-09-09'),
            average: 35.2
          },
          {
            date: new Date('2018-09-08'),
            average: 31.5
          }
        ]
      }
    };
  }

  public getProjectsToken (req: HttpRequest<any>): IResponse<any> {
    return {
      data: {
        items: [
          {
            hash: 'ei923040'
          }
        ]
      }
    };
  }
  public deleteProject (req: HttpRequest<any>): IResponse<any> {
    return {
      data: {
        items: [
          {

          }
        ]
      }
    };
  }

  public deleteLocation (req: HttpRequest<any>): IResponse<any> {
    return {
      data: {
        items: [
          {

          }
        ]
      }
    };
  }
}



function ProjectValidator (project: CloudProject) {
  const errors: Array<IResponseErrorItem> = [];

  if ( ! project.name) {
    errors.push({
      location: 'name',
      message: 'Project must have a name to be identified'
    });
  }
  if ( ! project.datasource) {
    errors.push({
      location: 'datasource',
      message: 'You must connect project to a data source'
    });
  }
  return errors;
}
