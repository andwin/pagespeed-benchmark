
const statistics = (metrics) => {
  const stats = {}

  const keys = Object.keys(metrics[0])
  keys.forEach((key) => {
    const values = metrics.map(m => m[key])

    const min = Math.min(...values)
    const max = Math.max(...values)
    const average = calculateAverage(values)
    const median = calculateMedian(values)

    stats[key] = {
      min,
      max,
      average,
      median,
    }
  })

  return stats
}

const calculateAverage = numbers => numbers.reduce((prev, curr) => prev + curr) / numbers.length

const calculateMedian = (numbers) => {
  const { length } = numbers
  numbers.sort()

  if (!length % 2) {
    return (numbers[length / 2 - 1] + numbers[length / 2]) / 2
  }

  return numbers[(length - 1) / 2]
}

module.exports = statistics
