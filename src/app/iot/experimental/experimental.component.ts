import { Component, OnInit } from '@angular/core';
import { CloudProject, CloudProjectType } from '@app/definitions';

@Component({
  selector: 'app-experimental',
  templateUrl: './experimental.component.html',
  styleUrls: ['./experimental.component.scss']
})
export class ExperimentalComponent implements OnInit {

  public liveData: any;
  public exampleProject: CloudProject = {
    name: 'Living room',
    type: CloudProjectType.TemperatureSensor,
    preferences: {}
  };
  ngOnInit() {
    setInterval(() => {
      this.liveData = [new Date().getTime(), Math.floor(Math.random() * 8 + 30)];
    }, 2000);
  }
}
