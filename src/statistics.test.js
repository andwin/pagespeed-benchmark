const statistics = require('./statistics')

test('asdf', () => {
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
