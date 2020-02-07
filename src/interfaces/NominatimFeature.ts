export interface NominatimFeature {
  type: 'Feature'
  bbox: [number, number, number, number]
  properties: {
    place_id: number
    osm_type: string
    osm_id: number
    display_name: string
    place_rank: number
    category: string
    type: string
    importance: number
    icon: string
    extratags: {
      place: string
      timezone: string
      population: string
      flag: string
      wikipedia: string
      [key: string]: string
    }
    namedetails: {
      name: string
      'name:en': string
    }
  }
  geometry: {
    type: string
    coordinates: number[] | number[][] | number[][][] | number[][][][]
  }
}
