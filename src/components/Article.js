import React from "react";
import moment from "moment";

const Article = ({ data }) => {
  return (
    <div>
      <img src={data.urlToImage} alt={data.title} />
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <small>{data.author}</small>
      <small>{moment(data.publishedAt).format("LLLL")}</small>
    </div>
  );
};

export default Article;
