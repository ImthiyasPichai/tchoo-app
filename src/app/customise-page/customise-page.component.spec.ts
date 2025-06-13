import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomisePageComponent } from './customise-page.component';

describe('CustomisePageComponent', () => {
  let component: CustomisePageComponent;
  let fixture: ComponentFixture<CustomisePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomisePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
