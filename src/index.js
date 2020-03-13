const commandLineArgs = require('command-line-args')

const printUsage = require('./print_usage')
const runLighthouse = require('./run_lighthouse')
const statistics = require('./statistics')
const printSummary = require('./print_summary')

const optionDefinitions = [
  { name: 'urls', type: String, multiple: true, defaultOption: true },
  { name: 'requests', alias: 'n', type: Number },
]

const run = async () => {
  let options

  try {
    options = commandLineArgs(optionDefinitions)
  } catch (e) {
    console.log(e)
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
    const urlMetrics = []

    for (let n = 0; n < requests; n++) {
      const res = await runLighthouse(url)
      const metrics = metricsFromResult(res)
      urlMetrics.push(metrics)
    }

    const urlStatistics = statistics(urlMetrics)

    summary[url] = urlStatistics
  }

  printSummary(summary)
}

const metricsFromResult = (res) => {
  const metrics = {}
  metrics.score = res.lhr.categories.performance.score

  const metricValues = [
    'time-to-first-byte',
    'first-contentful-paint',
    'first-meaningful-paint',
    'speed-index',
    'interactive',
    'first-cpu-idle',
    'estimated-input-latency',
    'max-potential-fid',
    'main-thread-tasks',
  ]

  metricValues.forEach((m) => {
    metrics[m] = res.lhr.audits[m].numericValue
  })

  return metrics
}

run()
