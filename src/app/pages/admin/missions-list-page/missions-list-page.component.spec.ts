import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsListPageComponent } from './missions-list-page.component';

describe('MissionsListPageComponent', () => {
  let component: MissionsListPageComponent;
  let fixture: ComponentFixture<MissionsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
