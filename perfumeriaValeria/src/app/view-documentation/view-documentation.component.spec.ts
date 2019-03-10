import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentationComponent } from './view-documentation.component';

describe('ViewDocumentationComponent', () => {
  let component: ViewDocumentationComponent;
  let fixture: ComponentFixture<ViewDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
