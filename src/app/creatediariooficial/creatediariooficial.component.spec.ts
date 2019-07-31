import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiarioOficialComponent } from './creatediariooficial.component';

describe('CreateDiarioOficialComponent', () => {
  let component: CreateDiarioOficialComponent;
  let fixture: ComponentFixture<CreateDiarioOficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiarioOficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiarioOficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
