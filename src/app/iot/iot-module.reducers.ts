import { StoreModule } from '@ngrx/store';
import { projectsReducer } from './reducers/projects.reducer';
import { locationsReducer } from './reducers/locations.reducer';
import { unconnectedReducer } from './reducers/unconnectedSources.reducer';

export function iotModuleReducersGenerator () {
  return StoreModule.forFeature('iotModule', {
    projects: projectsReducer,
    locations: locationsReducer,
    unconnectedSources: unconnectedReducer,
  });
}
