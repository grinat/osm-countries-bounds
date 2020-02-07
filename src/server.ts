import * as express from 'express'
import * as cors from 'cors'

import {getBoundsOfCountries} from './index'

const app = express()
const port = 3020

app.use(cors())

app.get('/getBoundsOfCountries', (_, res): void => {
  res.send(getBoundsOfCountries()).end()
})

app.listen(port)
console.log(`run on http://localhost:${port}`)
