import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FittingRoomComponent } from './fitting-room.component';

describe('FittingRoomComponent', () => {
  let component: FittingRoomComponent;
  let fixture: ComponentFixture<FittingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FittingRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FittingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
