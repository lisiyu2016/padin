import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IProjectDisplayPreference } from '@app/definitions';

@Component({
  selector: 'app-project-lamp',
  templateUrl: './project-lamp.component.html',
  styleUrls: ['./project-lamp.component.scss']
})
export class ProjectLampComponent {

  public form: IProjectDisplayPreference = {};
  @Output('onChange') public onChange: EventEmitter<IProjectDisplayPreference> = new EventEmitter();
  @Input('preferences') public set preferences (value:  IProjectDisplayPreference) {
    this.form = Object.assign({}, value) || {};
  }

  public TriggerChange () {
    this.onChange.emit(this.form);
  }

}
