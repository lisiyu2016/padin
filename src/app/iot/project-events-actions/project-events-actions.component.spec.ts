import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEventsActionsComponent } from './project-events-actions.component';

describe('ProjectEventsActionsComponent', () => {
  let component: ProjectEventsActionsComponent;
  let fixture: ComponentFixture<ProjectEventsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEventsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEventsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
