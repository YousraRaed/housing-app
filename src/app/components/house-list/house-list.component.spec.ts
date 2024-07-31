import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HouseListComponent } from './house-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../store/reducers';
import * as fromSelectors from '../../store/selectors/house.selectors';
import * as fromActions from '../../store/actions/house.action';
import { HouseModel } from '../../models/house.model';
import { of } from 'rxjs';

describe('HouseListComponent', () => {
  let component: HouseListComponent;
  let fixture: ComponentFixture<HouseListComponent>;
  let store: MockStore<AppState>;

  const mockHouses: HouseModel[] = [
    {
      id: '1',
      type: 'houses',
      links: { self: '' },
      attributes: {
        house_number: '123',
        block_number: 'A',
        land_number: '1',
        price: 100,
        model: 'model1',
        status: 'available',
        house_type: 'apartment',
      },
    },
  ];

  const mockHouseModels = {
    model1: {
      id: '1',
      type: 'house_models',
      links: { self: '' },
      attributes: {
        media: { title: 'Model 1', description: '', banner: '', video: '' },
        house_type: 'type1',
        house_number: '123',
        block_number: 'A',
        land_number: '1',
        price: 100,
        model: 'model1',
        status: 'available',
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseListComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        provideMockStore({
          initialState: {
            houses: {
              houses: mockHouses,
              houseModels: mockHouseModels,
              loading: false,
              error: null,
            },
          },
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore<AppState>;
    fixture = TestBed.createComponent(HouseListComponent);
    component = fixture.componentInstance;

    store.overrideSelector(fromSelectors.selectAllHouses, mockHouses);
    store.overrideSelector(fromSelectors.selectAllHouseModels, mockHouseModels);
    store.overrideSelector(fromSelectors.selectHouseLoading, false);
    store.overrideSelector(fromSelectors.selectHouseError, '');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    fixture.detectChanges();
    expect(component.filterForm).toBeDefined();
  });

  it('should dispatch loadHouseModels and loadHouses on init', () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(fromActions.loadHouseModels());
    expect(spy).toHaveBeenCalledWith(fromActions.loadHouses());
  });

  it('should call filterHouses and groupHousesByModel on form value changes', (done) => {
    fixture.detectChanges();
    component.filterForm.patchValue({ house_number: '123' });
    fixture.detectChanges();

    component.housesGroupedByModel$?.subscribe((housesGroupedByModel) => {
      expect(housesGroupedByModel['model1'].houses.length).toBe(1);
      done();
    });
  });

  it('should filter houses correctly', () => {
    const filterValues = {
      house_number: '123',
      block_number: '',
      land_number: '',
      min_price: '',
      max_price: '',
    };

    const filteredHouses = component.filterHouses(mockHouses, filterValues);
    expect(filteredHouses.length).toBe(1);
    expect(filteredHouses[0].attributes.house_number).toBe('123');
  });

  it('should group houses by model correctly', () => {
    const groupedHouses = component.groupHousesByModel(
      mockHouses,
      mockHouseModels
    );
    expect(groupedHouses['model1'].houses.length).toBe(1);
  });

  it('should toggle collapse state correctly', (done) => {
    component.collapseStates$ = of([false, false]);

    component.toggleCollapse(1);

    component.collapseStates$?.subscribe((collapseStates) => {
      expect(collapseStates[1]).toBeTrue();

      component.toggleCollapse(1);

      component.collapseStates$?.subscribe((newCollapseStates) => {
        expect(newCollapseStates[1]).toBeFalse();
        done();
      });
    });
  });
});
