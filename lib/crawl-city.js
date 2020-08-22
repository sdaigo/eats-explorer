const p = require('puppeteer')
const cheerio = require('cheerio')
const { selector } = require('../config/crawl-selector')

const crawl = async (area, url) => {
  console.log('goto: ', url)
  const browser = await p.launch({
    // headless: false,
    slowMo: 250,
    defaultViewport: {
      width: 1024,
      height: 800,
    },
  })
  const page = await browser.newPage()

  await page.goto(url, {
    waitUntil: 'networkidle0',
  })

  await page.type('#location-typeahead-home-input', area)

  await page.waitFor(1000 + Math.floor(Math.random() * 1000))

  // do search
  await page.keyboard.press('Enter')

  await page.waitFor(5000)

  let shopElements
  let rows = []

  while (true) {
    try {
      console.log('press next button to load shops...')
      await page.click('main > div:last-child > button')
      await page.waitFor(8000 + Math.floor(Math.random() * 2000))
    } catch (e) {
      console.log('no more next button...')

      shopElements = await page.$$eval(selector.main, shops => {
        return shops.map(s => s.innerHTML)
      })

      break
    }
  }

  shopElements.slice(5).forEach(html => {
    try {
      const $ = cheerio.load(html)
      const name = $(selector.name).text()
      const genre = $(selector.genre).text()
      const review = $(selector.review).text()
      const url = $(selector.url).attr('href')

      rows.push({
        area,
        name,
        genre,
        review,
        url: 'https://ubereats.com' + (url || ''),
      })
    } catch (e) {
      console.log('maybe not shop info', e.message)
    }
  })

  await browser.close()

  return rows
}

module.exports = crawl
