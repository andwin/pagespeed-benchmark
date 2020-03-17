#!/usr/bin/env node
const commandLineArgs = require('command-line-args')

const printUsage = require('./lib/print_usage')
const runLighthouse = require('./lib/run_lighthouse')
const metricsFromResult = require('./lib/metrics_from_result')
const statistics = require('./lib/statistics')
const printSummary = require('./lib/print_summary')

const optionDefinitions = [
  { name: 'urls', type: String, multiple: true, defaultOption: true },
  { name: 'requests', alias: 'n', type: Number },
]

const run = async () => {
  let options

  try {
    options = commandLineArgs(optionDefinitions)
  } catch (e) {
    console.log(e.toString())
    printUsage()
    process.exit(0)
  }

  if (!options.urls || !options.urls.length) {
    printUsage()
    process.exit(0)
  }

  const { urls } = options
  const defaultRequests = 10
  const requests = options.requests || defaultRequests

  console.log('Number of requests per url:', requests)

  const summary = {}
  // eslint-disable-next-line no-restricted-syntax
  for await (const url of urls) {
    console.log('Processing url:', url)
    const urlMetrics = []

    try {
      for (let n = 0; n < requests; n++) {
        const res = await runLighthouse(url)
        const metrics = metricsFromResult(res)
        urlMetrics.push(metrics)
      }

      const urlStatistics = statistics(urlMetrics)

      summary[url] = urlStatistics
    } catch (e) {
      console.log(e.friendlyMessage || e.toString())
    }
  }

  printSummary(summary)
}

run()
