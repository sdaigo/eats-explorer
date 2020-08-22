const stringify = require('csv-stringify/lib/sync')
const fs = require('fs-extra')
const { format } = require('date-fns')

const create = async (city, rows) => {
  const csvString = stringify(rows, {
    header: true,
    colmuns: {
      area: 'エリア',
      name: '店名',
      genre: 'ジャンル',
      review: 'レビュー',
      url: 'URL',
    },
  })

  const dir = `${__dirname}/../out/${city}`

  try {
    await fs.ensureDir(dir)
  } catch {
    await fs.mkdir(dir)
  }

  try {
    const fileName = fs.writeFileSync(
      `${__dirname}/../out/${city}/${format(new Date(), 'yyyy-MM-dd')}.csv`,
      csvString
    )
  } catch (e) {
    console.error('failed to create csv:', e)
  }
}

module.exports = create
