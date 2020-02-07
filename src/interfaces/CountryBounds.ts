import {NominatimFeature} from './NominatimFeature'

export interface CountryBounds {
  type: string
  licence: string
  features: NominatimFeature[]
}
