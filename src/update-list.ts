import * as iso3166 from 'iso3166-1'
import got from 'got'
import * as fs from 'fs'
import union from '@turf/union'
import simplify from '@turf/simplify'
import {NominatimResponse} from './interfaces/NominatimResponse'

async function wait(delayMs = 1000): Promise<void> {
  return new Promise((resolve: TimerHandler): number => setTimeout(resolve, delayMs))
}

async function update(): Promise<void> {
  const countryList = iso3166.list()

  const countryMap = {}
  for (let i = 0, len = countryList.length; i < len; i++) {
    const country: { alpha2: string } = countryList[i]

    console.log(`${new Date().toString()}: Get ${country.alpha2}, ${i + 1} of ${len}`)

    /**
     * @docs https://nominatim.org/release-docs/develop/api/Search/
     */
    const data = await got('https://nominatim.openstreetmap.org/search', {
      searchParams: `q=${country.alpha2}&format=geojson&countrycodes=${country.alpha2.toLowerCase()}&polygon_geojson=1&limit=1&extratags=1&namedetails=1`,
      headers: {
        'Referer': 'https://github.com/grinat/osm-countries-bounds.git',
      },
      responseType: 'json',
    })

    const raw: NominatimResponse = data.body as NominatimResponse

    if (!raw.features.length) {
      console.log(`${country.alpha2} skipped, no poly, https://wikipedia.org/wiki/${encodeURIComponent(raw.features[0]?.properties?.extratags?.wikipedia)}`)
      continue
    }

    try {
      let merged
      if (raw.features.length > 1) {
        merged = union(...raw.features)
      } else {
        merged = raw.features[0]
      }
      const simple = simplify(merged, {
        tolerance: 0.02,
        highQuality: true,
      })
      raw.features = [simple]

      if (raw.features[0].properties.extratags.place !== 'country') {
        console.log(`${country.alpha2} is not a country skipped, https://wikipedia.org/wiki/${encodeURIComponent(raw.features[0].properties.extratags.wikipedia)}`)
        continue
      }

      raw.features[0].properties.namedetails = {
        name: raw.features[0].properties.namedetails.name,
        'name:en':  raw.features[0].properties.namedetails['name:en'],
      }
    } catch (e) {
      console.log(`Error in ${country.alpha2}: ${e.toString()}`)
      console.error(e)
    }

    countryMap[country.alpha2] = raw

    fs.writeFileSync('list.json', JSON.stringify(countryMap, null, ' '))

    await wait()
  }

  console.log(`Done, added ${Object.keys(countryMap).length} countries of ${countryList.length}`)
}

update()
