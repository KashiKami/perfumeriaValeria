import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductProviderComponent } from './list-product-provider.component';

describe('ListProductProviderComponent', () => {
  let component: ListProductProviderComponent;
  let fixture: ComponentFixture<ListProductProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
