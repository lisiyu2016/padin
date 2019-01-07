import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IProjectDisplayPreference } from '@app/definitions';

@Component({
  selector: 'app-project-temperature',
  templateUrl: './project-temperature.component.html',
  styleUrls: ['./project-temperature.component.scss']
})
export class ProjectTemperatureComponent implements OnInit {

  public form: IProjectDisplayPreference = {};
  @Output('onChange') public onChange: EventEmitter<IProjectDisplayPreference> = new EventEmitter();
  @Input('preferences') public set preferences (value:  IProjectDisplayPreference) {
    this.form = Object.assign({}, value) || {};
  }

  constructor() { }

  ngOnInit() {
  }

  public TriggerChange () {
    // setTimeout(() => {
      this.onChange.emit(this.form);
    // })

  }

}
