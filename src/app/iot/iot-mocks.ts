import { CloudProjectType } from '@app/definitions';
import { random } from '@lodash';

export const IotProjects = [
  {
    id: 1,
    name: 'Hall temperature',
    type: CloudProjectType.TemperatureSensor,
    datasource: 'project-1',
    value: random(10, 30),
    location: 1,
    preferences: {
      DisplayRealTimeTemperatureInSidebar: true,
      DisplayHistoryStatisticsInHome: true
    }
  },
  {
    id: 2,
    name: 'Kitchen temperature',
    type: CloudProjectType.TemperatureSensor,
    datasource: 'project-2',
    value: random(10, 30),
    location: 1,
    preferences: {
      DisplayRealTimeTemperatureInSidebar: true
    }
  },
  {
    id: 3,
    name: 'Main Lamp',
    type: CloudProjectType.LampBridge,
    datasource: 'project-4',
    value: 1,
    location: 1,
    preferences: {
      DisplayLampOnOffInHome: true
    }
  },
  {
    id: 4,
    name: 'Lobby humidity',
    type: CloudProjectType.HumiditySensor,
    datasource: 'project-5',
    value: random(10, 60),
    location: 2,
    preferences: {
      DisplayHumidityInHome: true,
    }
  },
  {
    id: 5,
    name: 'CO2 sensor',
    type: CloudProjectType.CO2Sensor,
    datasource: 'project-6',
    value: random(100, 600),
    location: 2,
    preferences: {
      DisplayCO2InHome: true
    }
  },
  {
    id: 6,
    name: 'Magnet temperature',
    type: CloudProjectType.TemperatureSensor,
    datasource: 'project-7',
    value: random(10, 30),
    location: 2,
    preferences: {
      DisplayRealTimeTemperatureInSidebar: true
    }
  },
  {
    id: 7,
    name: 'Negative temperature',
    type: CloudProjectType.TemperatureSensor,
    datasource: 'project-8',
    value: random(10, 30),
    location: 3,
    preferences: {
      DisplayRealTimeTemperatureInSidebar: true
    }
  },
  {
    id: 8,
    name: 'Thermal temperature',
    type: CloudProjectType.TemperatureSensor,
    datasource: 'project-9',
    value: random(10, 30),
    location: 3,
    preferences: {
      DisplayRealTimeTemperatureInSidebar: true
    }
  },
];
