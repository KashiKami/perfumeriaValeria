import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGanancyComponent } from './report-ganancy.component';

describe('ReportGanancyComponent', () => {
  let component: ReportGanancyComponent;
  let fixture: ComponentFixture<ReportGanancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGanancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGanancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
