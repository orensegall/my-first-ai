require('dotenv').config()
const fs = require('fs')
const path = require('path')
const axios = require('axios')

async function fetchHeadlines () {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) {
    throw new Error('NEWS_API_KEY environment variable not set')
  }

  const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${apiKey}`
  const response = await axios.get(url)
  return response.data.articles || []
}

async function saveNewsData (articles) {
  const filePath = path.join(__dirname, '../../data/news.json')
  const output = articles.map(article => ({
    title: article.title,
    description: article.description,
    url: article.url
  }))
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
  await fs.promises.writeFile(filePath, JSON.stringify(output, null, 2))
}

async function main () {
  try {
    const articles = await fetchHeadlines()
    await saveNewsData(articles)
    console.log('News data saved to data/news.json')
  } catch (err) {
    console.error('Error fetching news:', err.message)
  }
}

if (require.main === module) {
  main()
}

module.exports = {
  fetchHeadlines,
  saveNewsData,
  main
}
