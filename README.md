# osm-countries-bounds
Package for node.js which contain countries with bounds and bbox in geojson format

[View bounds on map](https://grinat.github.io/osm-countries-bounds/test/polygons-on-map.html)

## Usage
Install
```bash
npm i osm-countries-bounds --save
```

Use
```typescript
import {getBoundsOfCountryByIsoAlpha2Code, getBoundsOfCountries} from 'osm-countries-bounds'

console.log(getBoundsOfCountryByIsoAlpha2Code('RU'))
console.log(getBoundsOfCountries())
```

## Update
Which action download poly data from nominatium and great list.json file
```bash
npm run update-list
```
After it you can check result
```bash
npm run test

# manual check result
npm run server
# and open test/polygons-on-map.html in browser
```
