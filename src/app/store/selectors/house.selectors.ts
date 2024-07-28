import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HouseState } from '../reducers/house.reducer';

export const selectHouseState = createFeatureSelector<HouseState>('houseState');

export const selectAllHouses = createSelector(
  selectHouseState,
  (state: HouseState) => state.houses
);
export const selectAllHouseModels = createSelector(
  selectHouseState,
  (state: HouseState) => state.houseModels
);
export const selectHouseLoading = createSelector(
  selectHouseState,
  (state: HouseState) => state.loading
);

export const selectHouseError = createSelector(
  selectHouseState,
  (state: HouseState) => state.error
);
