import React from "react";
import RenderSingle from "./RenderSingle";
import "./grid.css";

const RenderAll = ({ blogs, toggleStatus, addALike, handleDelete }) => {
  return (
    <div>
      <div className="body-title">
        <div>
          <h1>LIST OF YOUR FAVORITE ARTICLES</h1>
        </div>
        <div>
          <p>
            <strong>(from most to least liked)</strong>
          </p>
        </div>
      </div>
      <div className="grid">
        {blogs.map((blog) => (
          <RenderSingle
            key={blog.id}
            title={blog.title}
            author={blog.author}
            url={blog.url}
            likes={blog.likes}
            status={blog.status}
            toggleStatus={() => toggleStatus(blog.id)}
            addALike={() => addALike(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RenderAll;
