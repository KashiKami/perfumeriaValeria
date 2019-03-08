import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProviderOrderComponent } from './view-provider-order.component';

describe('ViewProviderOrderComponent', () => {
  let component: ViewProviderOrderComponent;
  let fixture: ComponentFixture<ViewProviderOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProviderOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProviderOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
