import { createReducer, on } from '@ngrx/store';
import * as HouseActions from '../actions/house.action';
import { HouseModel } from '../../models/house.model';

export interface HouseState {
  houses: HouseModel[];
  houseModels: { [key: string]: HouseModel };
  loading: boolean;
  error: string;
}

export const initialState: HouseState = {
  houses: [],
  houseModels: {},
  loading: false,
  error: '',
};

export const houseReducer = createReducer(
  initialState,
  on(HouseActions.loadHouses, (state) => ({
    ...state,
    loading: true,
  })),
  on(HouseActions.loadHousesSuccess, (state, { houses }) => {
    return {
      ...state,
      houses,
      loading: false,
    };
  }),
  on(HouseActions.loadHousesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(HouseActions.loadHouseModelsSuccess, (state, { houseModels }) => {
    const houseModelsMap = houseModels.reduce((acc, model) => {
      acc[model.attributes.model] = model;
      return acc;
    }, {} as { [key: string]: HouseModel });

    return {
      ...state,
      houseModels: houseModelsMap,
      loading: false,
    };
  }),
  on(HouseActions.loadHouseModelsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(HouseActions.addHouseSuccess, (state, { house }) => {
    const updatedHouses = [...state.houses, house];
    return {
      ...state,
      houses: updatedHouses,
      loading: false,
    };
  }),
  on(HouseActions.addHouseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(HouseActions.updateHouseSuccess, (state, { house }) => {
    const updatedHouses = state.houses.map((h) =>
      h.id === house.id ? house : h
    );
    return {
      ...state,
      houses: updatedHouses,
      loading: false,
    };
  }),
  on(HouseActions.updateHouseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
