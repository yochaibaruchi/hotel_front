import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type room = {
  qty: number;
  price: number;
};

interface OrderState {
  userId: number | null;
  start_date: Date;
  end_date: Date;
  hotelId: number | null;
  twoBeds: room;
  threeBeds: room;
  fourBeds: room;
  numberOfPeople: number;
  totalPriceForNight: number;
}

const today = new Date();
const twoDaysLater = new Date(today.setDate(today.getDate() + 2));
const initialState: OrderState = {
  userId: null,
  start_date: new Date(),
  end_date: twoDaysLater,
  hotelId: null,
  twoBeds: {
    qty: 0,
    price: 500,
  },
  threeBeds: {
    qty: 0,
    price: 750,
  },
  fourBeds: {
    qty: 0,
    price: 1000,
  },
  numberOfPeople: 2,
  totalPriceForNight: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    ///increase beds
    increase(state, { payload }: PayloadAction<number>): void {
      if (payload === 2) {
        state.twoBeds.qty++;
        state.totalPriceForNight = state.totalPriceForNight + 500;
      }
      if (payload === 3) {
        state.threeBeds.qty++;
        state.totalPriceForNight = state.totalPriceForNight + 750;
      }
      if (payload === 4) {
        state.fourBeds.qty++;
        state.totalPriceForNight = state.totalPriceForNight + 1000;
      }
    },

    //descend beds
    Descend(state, { payload }: PayloadAction<number>) {
      if (state.twoBeds.qty > 0 && payload === 2) {
        state.twoBeds.qty = state.twoBeds.qty - 1;
        state.totalPriceForNight = state.totalPriceForNight - 500;
      }
      if (state.threeBeds.qty > 0 && payload === 3) {
        state.threeBeds.qty = state.threeBeds.qty - 1;
        state.totalPriceForNight = state.totalPriceForNight - 750;
      }
      if (state.fourBeds.qty > 0 && payload === 4) {
        state.fourBeds.qty = state.fourBeds.qty - 1;
        state.totalPriceForNight = state.totalPriceForNight - 1000;
      }
    },

    //inserst
    insertDateAndNumber(
      state,
      {
        payload,
      }: PayloadAction<{
        startDate: Date;
        endDate: Date;
        numberOfGuests: number;
      }>
    ): void {
      state.start_date = payload.startDate;
      state.end_date = payload.endDate;
      state.numberOfPeople = payload.numberOfGuests;
    },
    AddUserId(state, { payload }: PayloadAction<number>): void {
      state.userId = payload;
    },
    changeHotelId(state, { payload }: PayloadAction<number>): void {
      state.hotelId = payload;
      state.fourBeds.qty = 0;
      state.threeBeds.qty = 0;
      state.twoBeds.qty = 0;
    },
    initialDate(state, { payload }: PayloadAction<Date>): void {
      state.start_date = payload;
    },
  },
});

export const {
  increase,
  Descend,
  insertDateAndNumber,
  changeHotelId,
  AddUserId,
} = orderSlice.actions;
export default orderSlice.reducer;
