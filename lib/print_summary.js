/* eslint-disable no-restricted-syntax */
const Table = require('easy-table')

const decimalsForMetric = {
  score: 2,
  'time-to-first-byte': 2,
  'first-contentful-paint': 0,
  'first-meaningful-paint': 0,
  'speed-index': 0,
  interactive: 0,
  'first-cpu-idle': 0,
  'estimated-input-latency': 1,
  'max-potential-fid': 1,
  'main-thread-tasks': 1,
}

const printSummary = (summary) => {
  for (const [url, result] of Object.entries(summary)) {
    const t = new Table()
    for (const [metric, data] of Object.entries(result)) {
      const decimals = decimalsForMetric[metric]

      t.cell('metric', metric)
      t.cell('median', data.median, Table.number(decimals))
      t.cell('average', data.average, Table.number(decimals))
      t.cell('min', data.min, Table.number(decimals))
      t.cell('max', data.max, Table.number(decimals))

      t.newRow()
    }

    console.log()
    console.log(url)
    console.log()
    console.log(t.toString())
  }
}

module.exports = printSummary
