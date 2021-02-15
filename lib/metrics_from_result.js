const performanceMetricNumericValues = [
  'server-response-time',
  'first-contentful-paint',
  'first-meaningful-paint',
  'cumulative-layout-shift',
  'largest-contentful-paint',
  'speed-index',
  'interactive',
  'first-cpu-idle',
  'estimated-input-latency',
  'max-potential-fid',
  'main-thread-tasks',
]

const metricsFromResult = (result) => {
  const metrics = {}
  metrics.performance = result.lhr.categories.performance.score * 100

  performanceMetricNumericValues.forEach((m) => {
    metrics[m] = result.lhr.audits[m].numericValue
  })

  const resourceSummary = result.lhr.audits['resource-summary'].details.items.find(i => i.resourceType === 'total')
  metrics['transfer-size'] = resourceSummary.size
  metrics['request-count'] = resourceSummary.requestCount

  metrics['dom-elements'] = result.lhr.audits['dom-size'].numericValue

  metrics.accessibility = result.lhr.categories.accessibility.score * 100
  metrics['best-practices'] = result.lhr.categories['best-practices'].score * 100
  metrics.seo = result.lhr.categories.seo.score * 100
  metrics.pwa = result.lhr.categories.pwa.score * 100

  return metrics
}

module.exports = metricsFromResult
