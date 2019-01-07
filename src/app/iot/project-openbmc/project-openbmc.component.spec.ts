import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOpenbmcComponent } from './project-openbmc.component';

describe('ProjectOpenbmcComponent', () => {
  let component: ProjectOpenbmcComponent;
  let fixture: ComponentFixture<ProjectOpenbmcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOpenbmcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOpenbmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
