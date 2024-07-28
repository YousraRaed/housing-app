export interface MediaAttributes {
  title: string;
  description: string;
  banner: string;
  video: string;
}

export interface HouseAttributes {
  house_number: string;
  block_number: string;
  land_number: string;
  model: string;
  house_type: string;
  price: number;
  status: string | null;
  media?: MediaAttributes;
}

export interface HouseModel {
  id: string;
  type: string;
  links: {
    self: string;
  };
  attributes: HouseAttributes;
}

export interface HouseResponse {
  data: HouseModel[];
  meta: {
    record_count: number;
  };
}
