# my first ai

## Development

See the [docs](http://docs.init.ai/reference/dev-server.html) for details on setting up the Dev Server.

### Installation

#### Node.js version

To [run your scripts locally](https://docs.init.ai/reference/dev-server.html#local-testing), you should make sure to use Node.js version 4.3.2.

We recommend using [nvm](https://github.com/creationix/nvm) to easily manage Node.js versions on your machine. This project is pre-provisioned with an `.nvmrc` file so you may simply run:

```bash
$ nvm use
```

#### Install dependencies

```bash
$ npm i
```

### Usage

#### Start the Dev Server

```bash
$ npm start
```

### Future Article Generator

This project includes a simple script that fetches recent headlines and asks the
OpenAI API to compose a short "future" article predicting what might happen next.

Before running, set the following environment variables:

```bash
export NEWS_API_KEY=<your-newsapi-key>
export OPENAI_API_KEY=<your-openai-key>
```

Run the script with Node.js:

```bash
$ node behavior/scripts/lib/future_articles.js
```

### Run Everything

To fetch the latest news and immediately generate a future article based on it,
use the helper script:

```bash
$ node behavior/scripts/lib/run_all.js
```


### News Data

Use the following script to download the latest news headlines and store them locally in `data/news.json`.

Make sure `NEWS_API_KEY` is set:

```bash
export NEWS_API_KEY=<your-newsapi-key>
node behavior/scripts/lib/fetch_news.js
```

Sample data is provided in `data/sample_news.json` if you want to test without calling the API.
