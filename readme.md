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

## Output
This is an example of what the output looks like

```
> node cli https://example.com/ -n 10

Number of requests per url: 10
Processing url: https://example.com/

https://example.com/

metric                   median  average  min     max
-----------------------  ------  -------  ------  ------
performance                 100      100     100     100
time-to-first-byte       114.07   141.93  105.44  196.73
first-contentful-paint      860      856     818     891
first-meaningful-paint      860      856     818     891
speed-index                1148     1129    1006    1216
interactive                 873      870     818     999
first-cpu-idle              860      865     818     974
estimated-input-latency    12.8     12.8    12.8    12.8
max-potential-fid          16.0     36.6    16.0   142.0
main-thread-tasks           2.5      2.5     2.0     3.0
transfer-size               850      850     849     850
request-count                 1        1       1       1
dom-elements                  5        5       5       5
accessibility                88       88      88      88
best-practices              100      100     100     100
seo                          90       90      90      90
pwa                          48       48      48      48
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
