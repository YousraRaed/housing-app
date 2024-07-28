import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth.reducer';
import { HouseState, houseReducer } from './house.reducer';

export interface AppState {
  houseState: HouseState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  houseState: houseReducer,
  auth: authReducer,
};
