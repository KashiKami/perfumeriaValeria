import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProviderComponent } from './view-provider.component';

describe('ViewProviderComponent', () => {
  let component: ViewProviderComponent;
  let fixture: ComponentFixture<ViewProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
