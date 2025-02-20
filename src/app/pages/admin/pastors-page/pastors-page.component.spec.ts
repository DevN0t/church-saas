import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastorsPageComponent } from './pastors-page.component';

describe('PastorsPageComponent', () => {
  let component: PastorsPageComponent;
  let fixture: ComponentFixture<PastorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastorsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
