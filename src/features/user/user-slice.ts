import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  isConected: boolean;
  id: number | null;
  mail: string | null;
  country: string | null;
  fullName: string | null;
}

const initialState: userState = {
  isConected: false,
  id: null,
  mail: null,
  country: null,
  fullName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isConected(
      state,
      {
        payload,
      }: PayloadAction<{
        country: string;
        firstName: string;
        lastName: string;
        id: number;
        mail: string;
      }>
    ) {
      state.isConected = true;
      state.country = payload.country;
      state.fullName = payload.firstName + " " + payload.lastName;
      state.id = payload.id;
      state.mail = payload.mail;
    },
    logOut(state): void {
      state.country = null;
      state.fullName = null;
      state.isConected = false;
      state.id = null;
      state.mail = null;
    },
  },
});

export const { isConected, logOut } = userSlice.actions;
export default userSlice.reducer;
