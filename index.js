const runLighthouse = require('./lib/run_lighthouse')
const metricsFromResult = require('./lib/metrics_from_result')
const statistics = require('./lib/statistics')

const benchmark = async (urls, requestsPerUrl, displayProgress = false) => {
  const summary = {}
  // eslint-disable-next-line no-restricted-syntax
  for await (const url of urls) {
    if (displayProgress) console.log('Processing url:', url)

    const urlMetrics = []

    for (let n = 0; n < requestsPerUrl; n++) {
      const res = await runLighthouse(url)
      const metrics = metricsFromResult(res)
      urlMetrics.push(metrics)
    }

    const urlStatistics = statistics(urlMetrics)

    summary[url] = urlStatistics
  }

  return summary
}

module.exports = benchmark
