import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateHouseComponent } from './add-update-house.component';

describe('AddUpdateHouseComponent', () => {
  let component: AddUpdateHouseComponent;
  let fixture: ComponentFixture<AddUpdateHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
