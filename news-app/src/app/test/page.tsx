export default async function Test() {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
  );

  const json = await res.json();
  const articles = json?.articles;

  console.log(articles);
  return <p>News</p>
}