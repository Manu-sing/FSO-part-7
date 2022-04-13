import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments";

const commmentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setComments, appendComment } = commmentsSlice.actions;

export const initializeComments = () => {
  return async (dispatch) => {
    const comments = await commentService.getAll();
    dispatch(setComments(comments));
  };
};

export const createComment = (obj) => {
  return async (dispatch) => {
    try {
      const newComment = await commentService.createNew(obj);
      dispatch(appendComment(newComment));
    } catch {
      console.log("Could not save the new commment");
    }
  };
};

export default commmentsSlice.reducer;
