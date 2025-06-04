require('dotenv').config()
const axios = require('axios')
const { Configuration, OpenAIApi } = require('openai')

/**
 * Fetch top headlines using the NewsAPI.
 * Returns a list of article objects.
 */
async function fetchHeadlines () {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) {
    throw new Error('NEWS_API_KEY environment variable not set')
  }
  const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=5&apiKey=${apiKey}`
  const response = await axios.get(url)
  return response.data.articles || []
}

/**
 * Generate a future article using OpenAI based on recent headlines.
 */
async function generatePrediction (news) {
  const openaiKey = process.env.OPENAI_API_KEY
  if (!openaiKey) {
    throw new Error('OPENAI_API_KEY environment variable not set')
  }
  const configuration = new Configuration({ apiKey: openaiKey })
  const openai = new OpenAIApi(configuration)

  const content = news.map((article, idx) => `${idx + 1}. ${article.title}`).join('\n')
  const prompt = [
    'Using the following recent headlines, predict what might happen next and write a short future news article.',
    '',
    content,
    '',
    'Article:'
  ].join('\n')

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }]
  })

  return response.data.choices[0].message.content.trim()
}

async function main () {
  try {
    const headlines = await fetchHeadlines()
    if (!headlines.length) {
      console.log('No news available')
      return
    }
    const article = await generatePrediction(headlines)
    console.log('\n--- Future Article ---\n')
    console.log(article)
    console.log('\n---------------------\n')
  } catch (err) {
    console.error('Error generating future article:', err.message)
  }
}

if (require.main === module) {
  main()
}

module.exports = {
  fetchHeadlines,
  generatePrediction,
  main
}

