import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { localStore } from '../../../utils/browser-store';
import { httpStatus } from '../../../constant';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/account/login/`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(credentials),
      },
    );

    const { data } = await res.json();
    if (res.status < 200 || res.status >= 300) {
      return rejectWithValue(data);
    }

    return {
      accessToken: data.access_token,
      user: data,
    };
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/registerSalon/`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();
    if (res.status < 200 || res.status >= 300) {
      return rejectWithValue(data);
    }

    return data;
  },
);

const initialState = {
  data: localStore.getItem('BARBER_REACT_APP_STORAGE')?.auth,
  status: httpStatus.IDLE,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStore.setItem('BARBER_REACT_APP_STORAGE', {
        auth: null,
      });
      state.data = initialState.data;
      state.status = initialState.status;
    },
    resetStatus: (state) => {
      state.status = httpStatus.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = httpStatus.PENDING;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      localStore.setItem('BARBER_REACT_APP_STORAGE', {
        auth: {
          ...action.payload,
        },
      });
      state.data = { ...action.payload };
      state.status = httpStatus.FULFILLED;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.data = { ...action.payload };
      state.status = httpStatus.REJECTED;
    });

    builder.addCase(signup.pending, (state) => {
      state.status = httpStatus.PENDING;
    });

    builder.addCase(signup.fulfilled, (state) => {
      state.status = httpStatus.FULFILLED;
    });

    builder.addCase(signup.rejected, (state) => {
      state.status = httpStatus.REJECTED;
    });
  },
});

export default authSlice.reducer;

export const { logout, resetStatus } = authSlice.actions;

export const selectAuth = (state) => {
  const accessToken = state.auth.data?.accessToken;

  if (accessToken) {
    const payloadJwt = JSON.parse(window.atob(accessToken.split('.')[1]));
    const exp = parseInt(payloadJwt.exp) * 1000;
    const current = new Date().getTime();
    if (current > exp) {
      return logout();
    }
  }
  return state.auth;
};
