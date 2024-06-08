import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: JSON.parse(localStorage.getItem("users") || "[]"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
  },
});

export const { setUsers, removeUser, addUser, updateUser } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;
