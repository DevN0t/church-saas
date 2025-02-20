import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCreatePageComponent } from './events-create-page.component';

describe('EventsCreatePageComponent', () => {
  let component: EventsCreatePageComponent;
  let fixture: ComponentFixture<EventsCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
