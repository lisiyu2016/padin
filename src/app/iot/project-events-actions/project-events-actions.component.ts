import { Component, OnInit } from '@angular/core';

export interface IEventAction {
  id?: number;
}

@Component({
  selector: 'app-project-events-actions',
  templateUrl: './project-events-actions.component.html',
  styleUrls: ['./project-events-actions.component.scss']
})
export class ProjectEventsActionsComponent implements OnInit {
  public terms: Array<IEventAction> = [
    {

    }
  ];
  constructor() { }

  ngOnInit() {

  }
  public AddAnother () {
    this.terms.push({
    });
  }

}
