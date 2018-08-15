import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluenceComponent } from './influence.component';

describe('InfluenceComponent', () => {
  let component: InfluenceComponent;
  let fixture: ComponentFixture<InfluenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
