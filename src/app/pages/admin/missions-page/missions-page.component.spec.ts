import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsPageComponent } from './missions-page.component';

describe('MissionsPageComponent', () => {
  let component: MissionsPageComponent;
  let fixture: ComponentFixture<MissionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
