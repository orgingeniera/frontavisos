import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvtManagerComponent } from './uvt-manager.component';

describe('UvtManagerComponent', () => {
  let component: UvtManagerComponent;
  let fixture: ComponentFixture<UvtManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UvtManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UvtManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
