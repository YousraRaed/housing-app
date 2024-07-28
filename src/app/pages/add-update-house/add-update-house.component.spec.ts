import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store/reducers';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AddUpdateHouseComponent } from './add-update-house.component';

describe('AddUpdateHouseComponent', () => {
  let component: AddUpdateHouseComponent;
  let fixture: ComponentFixture<AddUpdateHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateHouseComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot(reducers)],
      providers: [
        provideMockStore(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => '123' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
