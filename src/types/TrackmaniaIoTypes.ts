export interface TrackOfTheDayList_Response {
  year: number;
  month: number;
  lastday: number;
  days: TOTD_DayItem[];
  monthoffset: number;
  monthcount: number;
}

export interface TOTD_DayItem {
  campaignid: number;
  map: TrackManiaMap;
  weekday: number;
  monthday: number;
  leaderboarduid: string;
}

export interface TrackManiaMap {
  author: string;
  name: string;
  mapType: MapType;
  mapStyle: string;
  authorScore: number;
  goldScore: number;
  silverScore: number;
  bronzeScore: number;
  collectionName: MapCollectionName;
  filename: string;
  isPlayable: boolean;
  mapId: string;
  mapUid: string;
  submitter: string;
  timestamp: Date;
  fileUrl: string;
  thumbnailUrl: string;
  authorplayer: MapPlayer;
  submitterplayer: MapPlayer;
  exchangeid: number;
}

export interface MapPlayer {
  name: string;
  tag?: string;
  id: string;
  zone: GeographicalZoneCity | GeographicalZoneState | GeographicalZoneCountry;
  meta?: Meta;
}

export interface Meta {
  twitch?: string;
  youtube?: string;
  twitter?: string;
  vanity?: string;
  nadeo?: boolean;
}

export interface GeographicalZoneCity {
  name: string;
  flag: string;
  parent: GeographicalZoneState;
}

export interface GeographicalZoneState {
  name: string;
  flag: string;
  parent: GeographicalZoneCountry;
}

export interface GeographicalZoneCountry {
  name: string;
  flag: string;
  parent?: GeographicalZoneContinental;
}

export interface GeographicalZoneContinental {
  name: ContinentalRegion;
  flag: ContinentalFlag | string;
}

export enum ContinentalFlag {
  Europe = "europe",
  Fra = "FRA",
  Ger = "GER",
  Namerica = "namerica",
  Oceania = "oceania",
  WOR = "WOR",
}

export enum ContinentalRegion {
  Europe = "Europe",
  France = "France",
  Germany = "Germany",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  World = "World",
  Africa = "Africa",
}

export interface FluffyParent {
  name: ContinentalRegion;
  flag: ContinentalFlag;
  parent?: TentacledParent;
}

export interface TentacledParent {
  name: ContinentalRegion;
  flag: ContinentalFlag;
}

export enum MapType {
  "TrackMania_TM_Race" = "TrackMania\\TM_Race",
}

export enum MapCollectionName {
  Stadium = "Stadium",
}
