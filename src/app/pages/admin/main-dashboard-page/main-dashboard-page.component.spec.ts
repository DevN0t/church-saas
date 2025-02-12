import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashboardPageComponent } from './main-dashboard-page.component';

describe('MainDashboardPageComponent', () => {
  let component: MainDashboardPageComponent;
  let fixture: ComponentFixture<MainDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
