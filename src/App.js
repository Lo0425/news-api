import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Article from "./components/Article";
import Pagination from "./components/Pagination";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countryValues, setCountryValues] = useState("my");
  const [categoryValues, setCategoryValues] = useState("business");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const getNews = async (country, category) => {
    setLoading(true);
    if (!country) country = countryValues;
    if (!category) category = categoryValues;
    let start = fromDate;
    let end = toDate;

    let res = await fetch(
      `https://newsapi.org/v2/top-headlines?from=${start}&to=${end}&country=${country}&category=${category}&sortBy=popularity&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    let data = await res.json();
    setNews(data.articles);
    setLoading(false);
  };

  useEffect(() => {
    getNews();
  }, []);

  console.log(news);

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onClickHandler = (e) => {
    getNews();
  };

  // const handlePageClick = (data) => {
  //   console.log(data.selected);
  // };

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

            <div>
              <label>From:</label>
              <input
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
              />

              <label>To:</label>
              <input type="date" onChange={(e) => setToDate(e.target.value)} />
            </div>
            <button onClick={onClickHandler}>Search</button>
          </div>
          <Article posts={currentPosts} loading={loading} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={news.length}
            paginate={paginate}
          />
        </>
      )}
    </>
  );
}

export default App;
