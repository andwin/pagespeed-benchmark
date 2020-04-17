#!/usr/bin/env node
const commandLineArgs = require('command-line-args')

const printUsage = require('./lib/print_usage')
const pagespeedBenchmark = require('.')
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

  try {
    const summary = {}
    // eslint-disable-next-line no-restricted-syntax
    for await (const url of urls) {
      console.log('Processing url:', url)

      const urlStatistics = await pagespeedBenchmark(url, requests, true)
      summary[url] = urlStatistics
    }

    printSummary(summary)
  } catch (e) {
    console.log(e.friendlyMessage || e.toString())
  }
}

run()
