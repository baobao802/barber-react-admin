import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prompt: {
    isShowedPrompt: false,
    title: '',
    description: '',
    callback: () => {},
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openPrompt: (state) => {
      state.prompt = {
        ...state.prompt,
        isShowedPrompt: true,
      };
    },
    closePrompt: (state, action) => {
      state.prompt = {
        ...state.prompt,
        isShowedPrompt: false,
      };
      if (action.payload === true) {
        // eslint-disable-next-line no-new-func
        state.prompt.callback();
      }
    },
    setPrompt: (state, action) => {
      state.prompt = {
        ...state.prompt,
        title: action.payload?.title,
        description: action.payload?.description,
        callback: action.payload?.callback,
      };
    },
  },
});

export default appSlice.reducer;

export const { openPrompt, closePrompt, setPrompt } = appSlice.actions;

export const selectPromptState = (state) => state.app.prompt;
