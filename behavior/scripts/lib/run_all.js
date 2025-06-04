require('dotenv').config()
const fetchNews = require('./fetch_news')
const futureArticles = require('./future_articles')

async function runAll() {
  await fetchNews.main()
  await futureArticles.main()
}

if (require.main === module) {
  runAll().catch(err => {
    console.error('Error running scripts:', err.message)
  })
}

module.exports = { runAll }
