import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    detachBlog(state, action) {
      const id = action.payload;
      const blogToDelete = state.find((blog) => blog.id === id);
      return state.filter((blog) => blog.id !== id);
    },
    updateLike(state, action) {
      const id = action.payload;
      const blogToLike = state.find((blog) => blog.id === id);
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
      return state.map((blog) => (blog.id === id ? likedBlog : blog));
    },
    updateStatus(state, action) {
      const id = action.payload;
      const blogToToggle = state.find((blog) => blog.id === id);
      const changedStatus =
        blogToToggle.status === "Read" ? "Non Read" : "Read";
      const toggledBlog = { ...blogToToggle, status: changedStatus };
      return state.map((blog) => (blog.id === id ? toggledBlog : blog));
    },
  },
});

export const { appendBlog, setBlogs, detachBlog, updateLike, updateStatus } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const fromMostToLeastLiked = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(fromMostToLeastLiked));
  };
};

export const createBlog = (obj) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(obj);
      dispatch(appendBlog(newBlog));
    } catch {
      console.log("Could not save the new article");
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.removeBlog(id);
      dispatch(detachBlog(id));
    } catch {
      alert("YOU CAN ONLY DELETE AN ENTRY IF YOU CREATED IT.");
    }
  };
};

export const likeABlog = (id, obj) => {
  return async (dispatch) => {
    await blogService.update(id, obj);
    dispatch(updateLike(id));
  };
};

export const toggleABlog = (id, obj) => {
  return async (dispatch) => {
    await blogService.update(id, obj);
    dispatch(updateStatus(id));
  };
};

export default blogSlice.reducer;
