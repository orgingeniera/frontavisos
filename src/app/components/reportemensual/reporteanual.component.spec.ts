import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteanualComponent } from './reporteanual.component';

describe('ReporteanualComponent', () => {
  let component: ReporteanualComponent;
  let fixture: ComponentFixture<ReporteanualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteanualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteanualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
