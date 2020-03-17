const printUsage = () => {
  console.log('pagespeed-benchmark [options] url [url]')
  console.log('')
  console.log('Options:')
  console.log('  -n, --requests   number of requests per url (default 10)')
}

module.exports = printUsage
