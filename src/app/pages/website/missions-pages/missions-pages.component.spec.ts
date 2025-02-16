import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsPagesComponent } from './missions-pages.component';

describe('MissionsPagesComponent', () => {
  let component: MissionsPagesComponent;
  let fixture: ComponentFixture<MissionsPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
