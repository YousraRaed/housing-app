import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as HouseActions from '../../store/actions/house.action';
import { HouseModel } from '../../models/house.model';
import { AppState } from '../../store/reducers';
import { Observable, Subscription } from 'rxjs';
import {
  selectAllHouseModels,
  selectAllHouses,
} from 'src/app/store/selectors/house.selectors';

@Component({
  selector: 'app-add-update-house',
  templateUrl: './add-update-house.component.html',
  styleUrls: ['./add-update-house.component.scss'],
})
export class AddUpdateHouseComponent implements OnInit, OnDestroy {
  houseForm: FormGroup;
  houseId: string | null = null;
  houseModels$: Observable<{ [key: string]: HouseModel }>;
  houses$: Observable<HouseModel[]>;
  private subscriptions: Subscription = new Subscription();
  houseNumberTaken: boolean = false;
  houseNumber: string | undefined;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.houseForm = this.fb.group({
      house_number: ['', Validators.required],
      block_number: ['', Validators.required],
      land_number: ['', Validators.required],
      model: ['', Validators.required],
      house_type: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      status: [null],
    });
    this.houseModels$ = this.store.pipe(select(selectAllHouseModels));
    this.houses$ = this.store.pipe(select(selectAllHouses));
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        this.houseId = params.get('id');
        this.store.select(selectAllHouses).subscribe((houses) => {
          if (houses.length === 0) {
            this.store.dispatch(HouseActions.loadHouses());
          } else {
            const house = houses.find((h) => h.id === this.houseId);
            if (house) {
              this.houseForm.patchValue(house.attributes);
              this.houseNumber = house.attributes.house_number;
            }
          }
        });

        this.houseModels$.subscribe((models) => {
          if (Object.keys(models).length === 0) {
            this.store.dispatch(HouseActions.loadHouseModels());
          }
        });
      })
    );
    this.houseForm.valueChanges.subscribe((values) => {
      if (!values.house_number) {
        this.houseNumberTaken = false;
      }
    });
  }

  onSubmit(): void {
    if (this.houseForm.invalid) {
      return;
    }

    this.subscriptions.add(
      this.houses$.subscribe((houses) => {
        const houseWithSameNumber = houses.find(
          (house) =>
            house.attributes.house_number ===
              this.houseForm.value.house_number && house.id !== this.houseId
        );

        if (houseWithSameNumber) {
          this.houseNumberTaken = true;
          return;
        } else {
          this.houseNumberTaken = false;

          const house: Partial<HouseModel> = {
            type: 'houses',
            attributes: this.houseForm.value,
            id: this.houseId ?? undefined,
          };

          if (this.houseId) {
            this.store.dispatch(HouseActions.updateHouse({ house }));
          } else {
            this.store.dispatch(HouseActions.addHouse({ house }));
          }

          this.router.navigate(['/houses']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
