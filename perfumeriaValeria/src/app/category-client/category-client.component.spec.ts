import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryClientComponent } from './category-client.component';

describe('CategoryClientComponent', () => {
  let component: CategoryClientComponent;
  let fixture: ComponentFixture<CategoryClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
