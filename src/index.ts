import * as full from '../list.json'

import {CountryBoundsList} from './interfaces/CountryBoundsList'
import {CountryBounds} from './interfaces/CountryBounds'

export function getBoundsOfCountries(): CountryBoundsList {
  return (full as unknown as CountryBoundsList)
}

/**
 * @param countryCode - see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes use Alpha-2 code
 */
export function getBoundsOfCountryByIsoAlpha2Code(countryCode: string): CountryBounds {
  return full[countryCode.toUpperCase()]
}

export function getAvailableCountries(): string[] {
  return Object.keys(full)
}
