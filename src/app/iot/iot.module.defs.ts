import { CloudProject, DataSource } from '@app/definitions';

export interface IotModuleState {
  iotModule: {
    projects: Array<CloudProject>;
    locations: Array<any>;
    unconnectedSources: Array<DataSource>;
  };
}
