import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
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
export class HouseListComponent implements OnInit, OnDestroy {
  houses$: Observable<HouseModel[]>;
  houseModels$: Observable<{ [key: string]: HouseModel }>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  filterForm: FormGroup;
  housesGroupedByModel: { [key: string]: HouseModelWithMedia } = {};
  houseModelsKeys: {
    title: string;
    media: MediaAttributes;
    house_type: string;
  }[] = [];
  housesSubscription: Subscription | undefined;
  collapseStates: boolean[] = [];
  isAuthenticated$: Observable<boolean>;

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

    this.houses$ = this.store.pipe(select(selectAllHouses));
    this.houseModels$ = this.store.pipe(select(selectAllHouseModels));
    this.loading$ = this.store.pipe(select(selectHouseLoading));
    this.error$ = this.store.pipe(select(selectHouseError));
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }

  ngOnInit(): void {
    this.store.dispatch(loadHouseModels());
    this.store.dispatch(loadHouses());

    this.housesSubscription = combineLatest([
      this.houses$,
      this.houseModels$,
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)),
    ]).subscribe(([houses, houseModels, filterValues]) => {
      const filteredHouses = this.filterHouses(houses, filterValues);
      this.housesGroupedByModel = this.groupHousesByModel(
        filteredHouses,
        houseModels
      );

      this.houseModelsKeys = Object.keys(this.housesGroupedByModel).map(
        (key) => {
          return {
            title: key,
            media: this.housesGroupedByModel[key].media,
            house_type: this.housesGroupedByModel[key].house_type,
          };
        }
      );
      this.collapseStates = new Array(this.houseModelsKeys.length).fill(false);
    });
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

    return housesGroupedByModel;
  }

  toggleCollapse(index: number): void {
    this.collapseStates[index] = !this.collapseStates[index];
  }
  editHouse(id: string): void {
    this.router.navigate(['/house/edit', id]);
  }
  ngOnDestroy(): void {
    if (this.housesSubscription) {
      this.housesSubscription.unsubscribe();
    }
  }
}
