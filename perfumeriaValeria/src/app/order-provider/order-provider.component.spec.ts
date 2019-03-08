import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProviderComponent } from './order-provider.component';

describe('OrderProviderComponent', () => {
  let component: OrderProviderComponent;
  let fixture: ComponentFixture<OrderProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
