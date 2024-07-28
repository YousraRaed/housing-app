import { HouseModel, MediaAttributes } from './house.model';

export interface HouseModelWithMedia {
  houses: HouseModel[];
  media: MediaAttributes;
  house_type: string;
}
