import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IProjectDisplayPreference } from '@app/definitions';

@Component({
  selector: 'app-project-co2',
  templateUrl: './project-co2.component.html',
  styleUrls: ['./project-co2.component.scss']
})
export class ProjectCO2Component {

  public form: IProjectDisplayPreference = {};
  @Output('onChange') public onChange: EventEmitter<IProjectDisplayPreference> = new EventEmitter();
  @Input('preferences') public set preferences (value:  IProjectDisplayPreference) {
    this.form = Object.assign({}, value) || {};
  }

  public TriggerChange () {
    this.onChange.emit(this.form);
  }

}
