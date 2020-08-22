const parseCities = require('./lib/parse-cities')
const crawlCity = require('./lib/crawl-city')
const createCsv = require('./lib/generate-csv')

/**
 * STEPS:
 * 1. Read city list from 'cities.csv'
 * 2. Goto top page of each city
 * 3. repeat scroll down till infinite loader ends
 * 4. find restraunt card in page
 */

const main = async () => {
  const cities = await parseCities(__dirname + '/cities.csv')
  for (const city of cities) {
    const rows = await crawlCity(city.name, city.url)
    await createCsv(city.name, rows)
  }

  console.log('ok')
}

main()
