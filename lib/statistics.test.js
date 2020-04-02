const statistics = require('./statistics')

test('calculate statistics with odd number of values', () => {
  const metrics = [
    { score: 1 },
    { score: 2 },
    { score: 3 },
    { score: 5 },
    { score: 5 },
  ]

  const restult = statistics(metrics)

  expect(restult.score.min).toBe(1)
  expect(restult.score.max).toBe(5)
  expect(restult.score.average).toBe(3.2)
  expect(restult.score.median).toBe(3)
})

test('calculate statistics with even number of values', () => {
  const metrics = [
    { score: 5 },
    { score: 2 },
    { score: 5 },
    { score: 1 },
  ]

  const restult = statistics(metrics)

  expect(restult.score.min).toBe(1)
  expect(restult.score.max).toBe(5)
  expect(restult.score.average).toBe(3.25)
  expect(restult.score.median).toBe(3.5)
})

test('calculate statistics with even number of values', () => {
  const metrics = [
    { score: 5, 'speed-index': 1300 },
    { score: 2, 'speed-index': 1300 },
    { score: 5, 'speed-index': 1200 },
    { score: 1, 'speed-index': 1000 },
  ]
  const expected = {
    score: { min: 1, max: 5, average: 3.25, median: 3.5 },
    'speed-index': { min: 1000, max: 1300, average: 1200, median: 1250 },
  }

  const restult = statistics(metrics)

  expect(restult).toEqual(expected)
})
