import React from "react";
import { useParams } from "react-router-dom";
import "./grid.css";
import Comments from "./Comments";

const RenderSingleBlog = ({ blogs }) => {
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  if (!blog) {
    return null;
  }

  const title = blog.title;
  const author = blog.author;
  const url = blog.url;
  const likes = blog.likes;
  const status = blog.status;

  return (
    <div>
      <div className="grid-item">
        <div className="item-info">
          <h2 className="title">{title}</h2>
          <hr />
          <p className="article-info">
            <strong>Author: </strong>
            {author}
          </p>
          <div>
            <p label="link" className="article-info">
              <strong>Link:</strong> <a href={url}>{url}</a>
            </p>
            <p id="like" className="article-info">
              <strong>Likes:</strong> {likes}{" "}
            </p>
            <p className="article-info">
              <strong>Status:</strong> {status}
            </p>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default RenderSingleBlog;
