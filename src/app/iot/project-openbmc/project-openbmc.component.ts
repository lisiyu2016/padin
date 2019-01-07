import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IProjectDisplayPreference } from '@app/definitions';

@Component({
  selector: 'app-project-openbmc',
  templateUrl: './project-openbmc.component.html',
  styleUrls: ['./project-openbmc.component.scss']
})
export class ProjectOpenbmcComponent implements OnInit {

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