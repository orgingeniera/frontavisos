import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportegeneraldeclaracionesComponent } from './reportegeneraldeclaraciones.component';

describe('ReportegeneraldeclaracionesComponent', () => {
  let component: ReportegeneraldeclaracionesComponent;
  let fixture: ComponentFixture<ReportegeneraldeclaracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportegeneraldeclaracionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportegeneraldeclaracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
