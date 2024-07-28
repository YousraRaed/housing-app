import { createAction, props } from '@ngrx/store';
import { HouseModel } from '../../models/house.model';

export const loadHouses = createAction('[House] Load Houses');

export const loadHousesSuccess = createAction(
  '[House] Load Houses Success',
  props<{ houses: HouseModel[] }>()
);

export const loadHousesFailure = createAction(
  '[House] Load Houses Failure',
  props<{ error: string }>()
);

export const loadHouseModels = createAction('[House] Load House Models');

export const loadHouseModelsSuccess = createAction(
  '[House] Load House Models Success',
  props<{ houseModels: HouseModel[] }>()
);

export const loadHouseModelsFailure = createAction(
  '[House] Load House Models Failure',
  props<{ error: string }>()
);

export const addHouse = createAction(
  '[House] Add House',
  props<{ house: Partial<HouseModel> }>()
);
export const addHouseSuccess = createAction(
  '[House] Add House Success',
  props<{ house: HouseModel }>()
);
export const addHouseFailure = createAction(
  '[House] Add House Failure',
  props<{ error: any }>()
);

export const updateHouse = createAction(
  '[House] Update House',
  props<{ house: Partial<HouseModel> }>()
);
export const updateHouseSuccess = createAction(
  '[House] Update House Success',
  props<{ house: HouseModel }>()
);
export const updateHouseFailure = createAction(
  '[House] Update House Failure',
  props<{ error: any }>()
);
