import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListProviderComponent } from './order-list-provider.component';

describe('OrderListProviderComponent', () => {
  let component: OrderListProviderComponent;
  let fixture: ComponentFixture<OrderListProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
