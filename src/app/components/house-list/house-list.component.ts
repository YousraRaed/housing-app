import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';
import {
  loadHouseModels,
  loadHouses,
} from 'src/app/store/actions/house.action';
import {
  selectHouseLoading,
  selectAllHouses,
  selectHouseError,
  selectAllHouseModels,
} from 'src/app/store/selectors/house.selectors';
import { HouseModel, MediaAttributes } from '../../models/house.model';
import { selectIsAuthenticated } from 'src/app/store/selectors/auth.selector';
import { HouseModelWithMedia } from 'src/app/models/house-with-media.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss'],
})
export class HouseListComponent implements OnInit {
  houses$!: Observable<HouseModel[]>;
  houseModels$!: Observable<{ [key: string]: HouseModel }>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  filterForm: FormGroup;
  housesGroupedByModel$!: Observable<{ [key: string]: HouseModelWithMedia }>;
  houseModelsKeys$!: Observable<
    { title: string; media: MediaAttributes; house_type: string }[]
  >;
  collapseStates$!: Observable<boolean[]>;
  isAuthenticated$!: Observable<boolean>;
  private filterFormValues$: BehaviorSubject<any>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      house_number: [''],
      block_number: [''],
      land_number: [''],
      min_price: [''],
      max_price: [''],
    });

    this.filterFormValues$ = new BehaviorSubject(this.filterForm.value);
  }

  ngOnInit(): void {
    this.reloadData();

    const formValues$ = this.filterFormValues$
      .asObservable()
      .pipe(
        switchMap(() =>
          this.filterForm.valueChanges.pipe(startWith(this.filterForm.value))
        )
      );

    this.housesGroupedByModel$ = combineLatest([
      this.houses$,
      this.houseModels$,
      formValues$,
    ]).pipe(
      map(([houses, houseModels, filterValues]) => {
        const filteredHouses = this.filterHouses(
          houses as HouseModel[],
          filterValues
        );
        return this.groupHousesByModel(
          filteredHouses,
          houseModels as { [key: string]: HouseModel }
        );
      })
    );

    this.houseModelsKeys$ = this.housesGroupedByModel$.pipe(
      map((housesGroupedByModel) =>
        Object.keys(housesGroupedByModel).map((key) => ({
          title: key,
          media: housesGroupedByModel[key].media,
          house_type: housesGroupedByModel[key].house_type,
        }))
      )
    );

    this.collapseStates$ = this.houseModelsKeys$.pipe(
      map((houseModelsKeys) => new Array(houseModelsKeys.length).fill(false))
    );
  }

  reloadData() {
    this.store.dispatch(loadHouseModels());
    this.store.dispatch(loadHouses());
    this.houses$ = this.store.pipe(select(selectAllHouses));
    this.houseModels$ = this.store.pipe(select(selectAllHouseModels));
    this.loading$ = this.store.pipe(select(selectHouseLoading));
    this.error$ = this.store.pipe(select(selectHouseError));
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }

  filterHouses(houses: HouseModel[], filterValues: any): HouseModel[] {
    const { house_number, block_number, land_number, min_price, max_price } =
      filterValues;
    return houses.filter((house) => {
      return (
        (!house_number ||
          house.attributes.house_number.includes(house_number)) &&
        (!block_number ||
          house.attributes.block_number.includes(block_number)) &&
        (!land_number || house.attributes.land_number.includes(land_number)) &&
        (!min_price || house.attributes.price >= min_price) &&
        (!max_price || house.attributes.price <= max_price)
      );
    });
  }

  groupHousesByModel(
    houses: HouseModel[],
    houseModels: { [key: string]: HouseModel }
  ): { [key: string]: HouseModelWithMedia } {
    const housesGroupedByModel: { [key: string]: HouseModelWithMedia } = {};

    houses.forEach((house) => {
      const model = house.attributes.model;
      if (model) {
        if (!housesGroupedByModel[model]) {
          housesGroupedByModel[model] = {
            houses: [],
            media: houseModels[model]?.attributes?.media || {
              title: '',
              description: '',
              banner: '',
              video: '',
            },
            house_type: houseModels[model]?.attributes?.house_type || '',
          };
        }
        housesGroupedByModel[model].houses.push(house);
      }
    });

    Object.keys(housesGroupedByModel).forEach((model) => {
      if (housesGroupedByModel[model].houses.length === 0) {
        delete housesGroupedByModel[model];
      }
    });

    return housesGroupedByModel;
  }

  toggleCollapse(index: number): void {
    this.collapseStates$ = this.collapseStates$?.pipe(
      map((states) => {
        const newStates = [...states];
        newStates[index] = !newStates[index];
        return newStates;
      })
    );
  }

  editHouse(id: string): void {
    this.router.navigate(['/house/edit', id]);
  }
}
