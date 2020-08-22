const fs = require('fs-extra')
const parse = require('csv-parse/lib/sync')
const { tail } = require('ramda')

const parseCities = async path => {
  try {
    await fs.ensureFile(path)
  } catch (err) {
    throw new Error(`City file not found on ${path}`)
  }

  const content = await fs.readFile(path)
  const records = parse(content)
  return tail(records).map(r => ({
    slug: r[0],
    name: r[1],
    url: r[2],
  }))
}

module.exports = parseCities
