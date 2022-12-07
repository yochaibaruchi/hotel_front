import { beforeLoginAxios, afterLoginAxios } from "./axios";
import axios from "axios";
type room = {
  hotelId: number;
  room_capacity: number;
  image_url: string;
  hotel_name: string;
};
type reservation = {};

type roomsData = {
  data: room[];
};

type user = {
  country: string;
  firstName: string;
  last_name: string;
  id: number;
  mail: string;
};

type userAuth = {
  token: string;
  enter: boolean;
  message: string;
  user: user;
};
type hotel = {
  beds_left: number;
  hotel_address: string;
  hotel_id: number;
  hotel_location_Latitude: GLfloat;
  hotel_location_Longitude: GLfloat;
  hotel_name: string;
  hotel_pic_path: string;
  hotel_rating: GLfloat;
  rooms_left: number;
};

type hotelData = {
  data: hotel[];
  auth: boolean;
};
class httpService {
  async login(email: string, password: string) {
    try {
      const { data } = await beforeLoginAxios.post<userAuth>(
        "/api/user/login",
        {
          user_email: email,
          user_password: password,
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async getHotels(
    startDate: Date | null,
    endDate: Date | null,
    numberOfGuests: number
  ) {
    try {
      const { data } = await beforeLoginAxios.get<hotelData>(
        `/api/hotel/hotel/${startDate}/${endDate}/${numberOfGuests}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getRooms(
    startDate: Date | null,
    endDate: Date | null,
    hotelId: number | null
  ) {
    try {
      const { data } = await beforeLoginAxios.get<roomsData>(
        `/api/hotel/room/${startDate}/${endDate}/${hotelId}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  async order(
    userId: Number,
    startDate: Date,
    endDate: Date,
    hotelId: Number,
    NumberOfRoom2: Number,
    NumberOfRoom3: Number,
    NumberOfRoom4: Number
  ) {
    try {
      // const rawResponse = await fetch(
      //   "http://nodehotel-env.eba-j2swbhjm.eu-central-1.elasticbeanstalk.com/api/hotel/order",
      //   {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //       Authorization: token,
      //     },
      //     body: JSON.stringify({
      //       userId: userId,
      //       startDate: startDate,
      //       endDate: endDate,
      //       hotelId: hotelId,
      //       NumberOfRoom2: NumberOfRoom2,
      //       NumberOfRoom3: NumberOfRoom3,
      //       NumberOfRoom4: NumberOfRoom4,
      //     }),
      //   }
      // );
      // const content = await rawResponse.json();
      // return content;

      const response = await afterLoginAxios.post<{
        data: number;
        auth: boolean;
      }>("/api/hotel/order", {
        userId: userId,
        startDate: startDate,
        endDate: endDate,
        hotelId: hotelId,
        NumberOfRoom2: NumberOfRoom2,
        NumberOfRoom3: NumberOfRoom3,
        NumberOfRoom4: NumberOfRoom4,
      });

      if (response.status === 200) return response.data;
      alert("somthing wrong happend");
    } catch (err) {
      console.log(err);
    }
  }

  async reservation(order_id: number) {
    const response = await afterLoginAxios.get<{
      full_name: string;
      hotel_address: string;
      hotel_location_Latitude: GLfloat;
      hotel_location_Longitude: GLfloat;
      hotel_name: string;
      hotel_rating: GLfloat;
      order_date: Date;
      order_id: number;
      rent_end_date: Date;
      rent_start_date: Date;
      user_email: string;
    }>(`/api/hotel/reservation/${order_id}`);
    if (response.status === 200) return response.data;
  }
}

export default httpService;
