import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import signedInUserReducer from "./reducers/signedInUserReducer";
import usersReducer from "./reducers/usersReducer";
import commentsReducer from "./reducers/commentsReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    signedInUser: signedInUserReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

export default store;
