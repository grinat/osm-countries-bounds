import * as full from '../list.json'

import {ItemList} from './interfaces/ItemList'
import {Item} from './interfaces/Item'

export function getBoundsOfCountries(): ItemList {
  return (full as unknown as ItemList)
}

/**
 * @param countryCode - see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes use Alpha-2 code
 */
export function getBoundsOfCountryByIsoAlpha2Code(countryCode: string): Item {
  return full[countryCode.toUpperCase()]
}

export function getAvailableCountries(): string[] {
  return Object.keys(full)
}
