import UpdateOrInsert from '@components/functions/UpdateOrInsert';
import { CloudProject, DataSource, Action } from '@app/definitions';

export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export function projectsReducer (state: Array<CloudProject> = [], action: Action) {
  switch (action.type) {
    case 'RESET':
      return [];

    case 'UPDATE_COMPLEX_PROJECT':
      const data: { project: string, pin: string, value: string} = action.payload;
      return state.map((project) => {
        if (project.datasource === data.project) {
          if (typeof project.value !== 'object' || project.value === null) {
            project.value = {};
          }
          project.value[data.pin] = data.value;
        }
        return project;
      });
      break;
    case 'UPDATE_PROJECT':
      return UpdateOrInsert(action.payload , state, 'id', true);
    case 'DELETE_PROJECT':
      return state.filter(x => x.id !== action.payload);
    case 'INSERT_PROJECT':
      return state.concat(action.payload);
    case 'PROJECT_GET_DATA_SOURCE':
      const payload: DataSource = action.payload;
      const projectWithThisSource = state.find(x => x.datasource === payload.dataSourceId);
      if (projectWithThisSource) {
        return state.map(x => {
          if (+x.id === +projectWithThisSource.id) {
            x.value = payload.value;
            if (!x.dataHistory) {
              x.dataHistory = [];
            }
            if (x.dataHistory.length >= 5) {
              x.dataHistory.shift();
            }
            x.dataHistory.push(payload);
          }
          return x;
        });
      }
      return state;
  }
  return state;
}
