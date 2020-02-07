import 'mocha'
import {expect} from 'chai'

import {getAvailableCountries, getBoundsOfCountries, getBoundsOfCountryByIsoAlpha2Code} from '../src'

describe('bounds', () => {
  it('all countryes', async () => {
    const all = getBoundsOfCountries()

    expect(all['RU']).to.not.be.empty
    expect(all['RU'].features).to.not.be.empty
  })

  it('one country', async () => {
    const country = getBoundsOfCountryByIsoAlpha2Code('RU')

    expect(country).to.not.be.empty
    expect(country.features).to.not.be.empty
  })

  it('avalaible countryies list', async () => {
    const list = getAvailableCountries()

    expect(list).to.not.be.empty
    expect(list.indexOf('RU') > -1).to.be.true
  })
})
