import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAdminComponent } from './detail-admin.component';

describe('DetailAdminComponent', () => {
  let component: DetailAdminComponent;
  let fixture: ComponentFixture<DetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
