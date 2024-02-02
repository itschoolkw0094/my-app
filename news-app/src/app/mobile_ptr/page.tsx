import PullToRefresh from "react-simple-pull-to-refresh";
import { useState } from "react";

const Mobile_ptr = () => {
  const [article, setArticle] = useState()

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await response.json();
    setArticle(json)
  }
}