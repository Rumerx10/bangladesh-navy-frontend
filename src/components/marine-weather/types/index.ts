export interface IStationCoordinates {
  lat: number;
  lng: number;
}

/** A row from /external-stations. */
export interface IExternalStation {
  id: number;
  name: string;
  net_id?: number;
  station_type_id?: number;
  customer_id?: string;
  owner?: string;
  coordinates: IStationCoordinates | null;
  altitude?: number;
  site?: string;
  province?: string;
  municipality?: string;
  basin_id?: number;
  note?: string;
  state?: string;
  image_url?: string;
  monograph_url?: string;
  test_measure_id?: number;
  transmission_interval?: number;
  storage_interval?: number;
  alert_zone_id?: number | null;
}

/** A station whose coordinates were usable, so it can be plotted. */
export interface IPlottedExternalStation extends IExternalStation {
  lat: number;
  lng: number;
}

/** One row of the popup's Data table, after normalisation. */
export interface IStationMeasure {
  measure: string;
  value: string;
  unit: string;
  date: string;
}
