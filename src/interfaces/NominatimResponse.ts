import {NominatimFeature} from './NominatimFeature'

export interface NominatimResponse {
  type: string
  licence: string
  features: NominatimFeature[]
}
