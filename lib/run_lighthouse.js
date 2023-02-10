const puppeteer = require('puppeteer')
const lighthouse = require('lighthouse')

const runLighthouse = async (url) => {
  const browserOptions = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-storage-reset',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-first-run',
    ],
  }
  const browser = await puppeteer.launch(browserOptions)

  try {
    const lighthouseOptions = {
      port: new URL(browser.wsEndpoint()).port,
      output: 'json',
    }
    const res = await lighthouse(url, lighthouseOptions)

    browser.close()
    return res
  } catch (e) {
    browser.close()
    throw e
  }
}

module.exports = runLighthouse
