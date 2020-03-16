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

const metricsFromResult = (result) => {
  const metrics = {}
  metrics.score = result.lhr.categories.performance.score

  metricValues.forEach((m) => {
    metrics[m] = result.lhr.audits[m].numericValue
  })

  return metrics
}

module.exports = metricsFromResult
