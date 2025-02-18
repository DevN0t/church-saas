import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionCreatePageComponent } from './mission-create-page.component';

describe('MissionCreatePageComponent', () => {
  let component: MissionCreatePageComponent;
  let fixture: ComponentFixture<MissionCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
