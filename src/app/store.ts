import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../features/order/order-slice";
import userReducer from "../features/user/user-slice";
export const store = configureStore({
  reducer: {
    order: orderReducer,
    user: userReducer,
  },
});

export type appDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
