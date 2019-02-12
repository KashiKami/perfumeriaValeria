import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderClientComponent } from './detail-order-client.component';

describe('DetailOrderClientComponent', () => {
  let component: DetailOrderClientComponent;
  let fixture: ComponentFixture<DetailOrderClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOrderClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrderClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
