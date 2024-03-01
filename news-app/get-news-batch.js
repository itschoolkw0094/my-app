// import { PrismaClient } from '@prisma/client'
// import { title } from 'process';
const { PrismaClient } = require('@prisma/client');
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWS_API_KEY)

const prisma = new PrismaClient()

// const data = await fetch(
//   `${process.env.NEWS_API_URL + process.env.NEWS_API_KEY}`,
//     {
//       method: 'GET',
//       // headers: {
//       //   Accept: 'application/json',
//       //   'Content-Type': 'application/json',
//       // },
//     },
// )

newsapi.v2.topHeadlines({
  pageSize: 5,
  language: 'jp',
  country: 'jp'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
  try {
    response.articles.map((v) => {
      prisma.news.create({
        data: {
          image: v.urlToImage,
          title: v.title,
          content: v.description,
          article_url: v.url,
        }
      }).then(
        console.log('success to push')
      )
    })
  } catch (error) {
    console.error(error)
  }
});


