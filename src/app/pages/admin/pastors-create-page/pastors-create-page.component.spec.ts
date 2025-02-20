import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastorsCreatePageComponent } from './pastors-create-page.component';

describe('PastorsCreatePageComponent', () => {
  let component: PastorsCreatePageComponent;
  let fixture: ComponentFixture<PastorsCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastorsCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastorsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
