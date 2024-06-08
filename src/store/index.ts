import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/components/authSlice";
import userReducer from "../features/user/components/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
