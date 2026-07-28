/** Only key/value are guaranteed on the tidal-station payload. */
export interface ITidalStationProductAttribute {
  key: string;
  value: string;
}

export interface ITidalStationProduct {
  id: string;
  nameEn: string;
  nameBn: string;
  isTidal: boolean;
  images?: string[];
  productAttributes?: ITidalStationProductAttribute[];
}

export interface ITidalStation {
  id: string;
  generalArea: string;
  location: string;
  latitude: string;
  longitude: string;
  status: string;
  productId: string;
  product?: ITidalStationProduct | null;
  createdAt: string;
  updatedAt: string;
}

/** A station whose latitude/longitude parsed into usable decimal degrees. */
export interface IPlottedStation extends ITidalStation {
  lat: number;
  lng: number;
}
