/* eslint-disable no-restricted-syntax */
const Table = require('easy-table')

const printSummary = (summary) => {
  for (const [url, result] of Object.entries(summary)) {
    const t = new Table()
    for (const [metric, data] of Object.entries(result)) {
      t.cell('metric', metric)
      t.cell('median', data.median, Table.number(2))
      t.cell('average', data.average, Table.number(2))
      t.cell('min', data.min, Table.number(2))
      t.cell('max', data.max, Table.number(2))
      t.newRow()
    }

    console.log()
    console.log(url)
    console.log()
    console.log(t.toString())
  }
}

module.exports = printSummary
