const puppeteer = require('puppeteer')
const lighthouse = require('lighthouse')

const runLighthouse = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const res = await lighthouse(url, {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json',
    // settings: {
    onlyCategories: ['performance'],
    onlyAudits: [],
    // },
  })

  browser.close()
  return res
}

// const launchPuppeteer = () => {
//   return browser
// }

module.exports = runLighthouse
