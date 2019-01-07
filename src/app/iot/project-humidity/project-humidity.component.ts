import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IProjectDisplayPreference } from '@app/definitions';

@Component({
  selector: 'app-project-humidity',
  templateUrl: './project-humidity.component.html',
  styleUrls: ['./project-humidity.component.scss']
})
export class ProjectHumidityComponent {

  public form: IProjectDisplayPreference = {};
  @Output('onChange') public onChange: EventEmitter<IProjectDisplayPreference> = new EventEmitter();
  @Input('preferences') public set preferences (value:  IProjectDisplayPreference) {
    this.form = Object.assign({}, value) || {};
  }

  public TriggerChange () {
    this.onChange.emit(this.form);
  }

}
