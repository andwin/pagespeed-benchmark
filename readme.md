
# Lighthouse benchmark

Lighthouse benchmark is a tool to run [Lighthouse](https://github.com/GoogleChrome/lighthouse) pagespeed test multiple times on multiple urls and display statistics.

When trying to improve your pagespeed score you might want to check to see the result of your changes. Lighthouse is a very good tool for that, but the [variability](https://developers.google.com/web/tools/lighthouse/variability) in the result means you have to run the tool several times and use the median values to exclude extremes.

## Run without installing using npx
```
npx pagespeed-benchmark https://www.github.com/ -n5
```

This will download the latest version of this tool every time you run it. Including a 100+ MB chromium browser.

## Installing locally
```
npm i -g pagespeed-benchmark

pagespeed-benchmark https://www.github.com/ -n5
```

## From another script

First install the package

```
npm i -g pagespeed-benchmark
```

And then something like this in your code
```
const pagespeedBenchmark = require('pagespeed-benchmark')

const urls = [
  'https://example.com/',
  'https://www.npmjs.com/',
]

const requestsPerUrl = 3

const run = async () => {
  for await (const url of urls) {
    console.log('Processing url:', url)

    const urlStatistics = await pagespeedBenchmark(url, requestsPerUrl)

    console.log()

    for (const [metric, data] of Object.entries(urlStatistics)) {
      console.log(metric, data.median)
    }

    console.log()
    console.log()
  }
}

run()
```
