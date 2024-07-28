import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllHouses } from 'src/app/store/selectors/house.selectors';
import { AppState } from '../store/reducers';
import { HouseModel } from '../models/house.model';

export function uniqueHouseNumberValidator(
  store: Store<AppState>,
  currentHouseId: string | null
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return control.valueChanges.pipe(
      debounceTime(300),
      switchMap(() =>
        store.select(selectAllHouses).pipe(
          map((houses: HouseModel[]) => {
            const houseWithSameNumber = houses.find(
              (house) =>
                house.attributes.house_number === control.value &&
                house.id !== currentHouseId
            );
            return houseWithSameNumber ? { houseNumberTaken: true } : null;
          }),
          catchError(() => of(null))
        )
      )
    );
  };
}
