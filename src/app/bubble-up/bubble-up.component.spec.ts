import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleUpComponent } from './bubble-up.component';

describe('BubbleUpComponent', () => {
  let component: BubbleUpComponent;
  let fixture: ComponentFixture<BubbleUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BubbleUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
