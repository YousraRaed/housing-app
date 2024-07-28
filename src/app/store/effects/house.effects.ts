import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HouseService } from '../../services/house/house.service';
import * as HouseActions from '../actions/house.action';

@Injectable()
export class HouseEffects {
  constructor(private actions$: Actions, private houseService: HouseService) {}
  loadHouses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseActions.loadHouses),
      mergeMap(() =>
        this.houseService.getHouses().pipe(
          map((response) =>
            HouseActions.loadHousesSuccess({ houses: response.data })
          ),
          catchError((error) =>
            of(HouseActions.loadHousesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadHouseModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseActions.loadHouseModels),
      mergeMap(() =>
        this.houseService.getHouseModels().pipe(
          map((response) =>
            HouseActions.loadHouseModelsSuccess({ houseModels: response.data })
          ),
          catchError((error) =>
            of(HouseActions.loadHouseModelsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addHouse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseActions.addHouse),
      mergeMap((action) =>
        this.houseService.addHouse(action.house).pipe(
          map((response) =>
            HouseActions.addHouseSuccess({ house: response.data })
          ),
          catchError((error) => of(HouseActions.addHouseFailure({ error })))
        )
      )
    )
  );

  updateHouse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseActions.updateHouse),
      mergeMap((action) =>
        this.houseService.updateHouse(action.house).pipe(
          map((response) =>
            HouseActions.updateHouseSuccess({ house: response.data })
          ),
          catchError((error) => of(HouseActions.updateHouseFailure({ error })))
        )
      )
    )
  );
}
