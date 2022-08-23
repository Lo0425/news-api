import React, { useState, useEffect } from "react";
import Article from "./components/Article";
function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countryValues, setCountryValues] = useState("my");
  const [categoryValues, setCategoryValues] = useState("business");

  console.log(countryValues);
  const getNews = async (country, category) => {
    setLoading(true);
    if (!country) country = countryValues;
    if (!category) category = categoryValues;
    let res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    let data = await res.json();
    setNews(data.articles);
    setLoading(false);
  };

  useEffect(() => {
    getNews();
  }, []);

  const categories = [
    "general",
    "business",
    "health",
    "entertainment",
    "science",
    "sports",
    "technology",
  ];

  const countries = [
    "my",
    "ch",
    "at",
    "au",
    "ae",
    "cn",
    "jp",
    "ph",
    "vn",
    "th",
    "ru",
    "in",
  ];

  const showNews = news.length ? (
    news.map((article, i) => <Article data={article} key={i} />)
  ) : (
    <p>No news to show</p>
  );

  const onClickHandler = (e) => {
    getNews();
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <select
              id="country"
              name="country"
              defaultValue={""}
              onChange={(e) => setCountryValues(e.target.value)}
            >
              <option value="" disabled>
                Choose Country
              </option>
              {countries.map((country, i) => (
                <option value={country} key={i}>
                  {country}
                </option>
              ))}
            </select>
            <select
              id="category"
              name="category"
              defaultValue={""}
              onChange={(e) => setCategoryValues(e.target.value)}
            >
              <option value="" disabled>
                Choose Category
              </option>
              {categories.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button onClick={onClickHandler}>Search</button>
          </div>
          {showNews}
        </>
      )}
    </>
  );
}

export default App;
