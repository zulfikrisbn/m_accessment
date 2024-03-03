import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFreelancerComponent } from './view-freelancer.component';

describe('ViewFreelancerComponent', () => {
  let component: ViewFreelancerComponent;
  let fixture: ComponentFixture<ViewFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFreelancerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
