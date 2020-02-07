import {NominatimFeature} from './NominatimFeature'

export interface Item {
  type: string
  licence: string
  features: NominatimFeature[]
}

