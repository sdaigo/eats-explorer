const shopSelector = {
  main: 'main > div:nth-child(3) > div:nth-child(2) > div',
  genre: 'div > div > div > div:last-child > div:last-child > div',
  review: 'div > div > div > div:last-child > div:first-child > :last-child',
  name: 'div > div > div > div > div:first-child > div > h3 > a',
  url: 'div > div > div > div > div:first-child > div > h3 > a',
}

module.exports = {
  selector: shopSelector,
}
