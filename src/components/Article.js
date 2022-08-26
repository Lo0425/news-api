import React from "react";
import moment from "moment";

const Article = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      {posts.map((post) => (
        <>
          <img src={post.urlToImage} alt={post.title} />
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <small>{post.author}</small>
          <small>{moment(post.publishedAt).format("LLLL")}</small>
        </>
      ))}
    </div>
  );
};

export default Article;
