import {Action as NgrxAction} from '@ngrx/store';

export interface Action extends NgrxAction {
  payload: any;
}
export interface IUserForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password2: string;
}

export interface IUser {
  id?: number;
  username: string;
  email: string;
  avatar: string;
  preferences: {
    language?: 'pl' | 'en';
  };
  phone: string;
  firstname: string;
  lastname: string;
  role: IRole;
}

export interface IPermission {
  title: string;
  key: string;
  group: string;
}

export interface IRole {
  id: number;
  title: string;
  permissions: Array<IPermission>;
}

declare global {
  export interface Window {
    io: any;
  }
}

export interface SidebarWidgetItem {
  title?: string;
  value?: string | {
    amount: any;
    unit: string;
  };
  icon?: string;
}

/**
 * A place, defines the area of modules and infrustructure
 */
export interface ILocation {
  id: Number;
  name: string;
  icon: string;
  temperatureProject: any;
  level: string;
}

export interface IPermission {
  title: string;
  key: string;
  group: string;
}

/**
 * Represents the application store structure
 */
export interface AppState {
  roles: Array<IRole>;
  users: Array<IUser>;
  notifications: Array<INotification>;
  activities: Array<IActivity>;
}

/**
 * Occures when a project changes
 */
export enum ActivityTypes {
  ProjectPinChange
}
/**
 * This represents if an activity occures in application
 */
export interface IActivity {
  id: Number;
  description: string;
  type: ActivityTypes;
  meta: any;
  icon: string;
  iconType: string;
  reason: string;
  time: string;
}


export interface IVPCInformation {
  administrator: string;
  administratorPassword: string;
  vpcname: string;
  vpcregion: string;
}
export interface WorkspaceUser {
  Email: string;
  Name: string;
  LastActivity: string;
  Access: string;
}

/**
 * Represents a change in project data, when happens inside a analog project reader;
 * such as temperature, pressure, and humidity.
 */

export enum TemperatureCustomization {
  SidebarRealTimeValue,
  SidebarLastWeekAverage
}

export interface IProjectDisplayPreference {
  DisplayRealTimeTemperatureInSidebar?: boolean;
  DisplayLampOnOffInHome?: boolean;
  DisplayHumidityInHome?: boolean;
  DisplayCO2InHome?: boolean;
  DisplayHistoryStatisticsInHome?: boolean;
}

export interface DataSource {
  dataSourceId: string;
  value: any;
  geo?: {
    lat: number;
    lng: number;
  };
  date?: Date;
}

export enum CloudProjectType {
  OpenBMC = 0,
  TemperatureSensor = 1,
  LampBridge = 2,
  HumiditySensor = 3,
  CO2Sensor = 4,
}

export interface CloudProjectStatistics {
  minimumValue?: number;
  maximumValue?: number;
}
export interface CloudProject {
  id?: any;
  name?: string;
  datasource?: string;
  type: CloudProjectType;
  description?: string;
  model?: string;
  location?: any;
  preferences: IProjectDisplayPreference;
  value?: any;
  dataHistory?: Array<DataSource>;
  statistics?: CloudProjectStatistics;
}


export interface PagePointerPosition {
  x: number;
  y: number;
}

/**
 * Shows a project usage per month, and it's details.
 */
export interface ICloudProjectDailyHistory {
  date: Date;
  average: number;
}

export interface INotification {
  title?: string;
  type: 'error' | 'success';
  status: string;
  date: Date;
  message?: string;
}
export interface ISettingsUpdateResponse {
  token: string;
  user: IUser;
}
export interface IContact {
  type: 'email' | 'call' | 'sms';
  value: any;
}

export interface IResetForm {
  password1: string;
  password2: string;
  key: string;
}
