import { Component, Input } from '@angular/core';
import { CloudProject } from '@app/definitions';

@Component({
  selector: 'app-switch-widgets',
  templateUrl: './switch-widgets.component.html',
  styleUrls: ['./switch-widgets.component.scss' , '../checkbox-switch.scss']
})
export class SwitchWidgetsComponent {

  @Input('project') public project: CloudProject;

  public GetIcon (project: CloudProject) {
    return 'icon-cloud_circle';
  }

  public IsTemperature (project: CloudProject) {
    return false;
  }
  public value (project: CloudProject) {
    if (! project.value || !project.value.toFixed) {
      return project.value;
    }
    if (project.value === 'ON' || project.value === 'OFF') {
      return project.value;
    }
    return (project.value as Number).toFixed(2);
  }
}
