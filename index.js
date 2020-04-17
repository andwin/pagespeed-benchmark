const runLighthouse = require('./lib/run_lighthouse')
const metricsFromResult = require('./lib/metrics_from_result')
const statistics = require('./lib/statistics')

const pagespeedBenchmark = async (url, requestsPerUrl) => {
  const urlMetrics = []

  for (let n = 0; n < requestsPerUrl; n++) {
    const res = await runLighthouse(url)
    const metrics = metricsFromResult(res)
    urlMetrics.push(metrics)
  }

  const urlStatistics = statistics(urlMetrics)

  return urlStatistics
}

module.exports = pagespeedBenchmark
