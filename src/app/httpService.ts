import axios from "axios";
import { beforeLoginAxios } from "./axios";

type room = {
  hotelId: number;
  room_capacity: number;
  image_url: string;
  hotel_name: string;
};
type signUp = {
  first_name: string;
  last_name: string;
  user_email: string;
  user_password: string;
  password_check: string;
  user_country: string;
};

type reservation = {
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
};
type update = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
};
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
      const token = sessionStorage["token"];
      const afterLoginAxios = axios.create({
        baseURL: "https://hotelapidemo.com",
        headers: {
          "x-access-token": token,
        },
      });
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

      if (response.status === 201) return response.data;
      if (response.status === 200)
        alert("somthing wrong happend,login again if you wish to proceed");
    } catch (err) {
      console.log(err);
    }
  }

  async reservation(order_id: string) {
    const token = sessionStorage["token"];
    const afterLoginAxios = axios.create({
      baseURL: "https://hotelapidemo.com",
      headers: {
        "x-access-token": token,
      },
    });
    const response = await afterLoginAxios.get<reservation>(
      `/api/hotel/reservation/${order_id}`
    );
    if (response.status === 200) return response.data;
  }

  async signUp(userData: signUp) {
    const response = await beforeLoginAxios.post("/api/user/signIn", {
      first_name: userData.first_name,
      last_name: userData.last_name,
      user_email: userData.user_email,
      user_password: userData.user_password,
      user_country: userData.user_country,
    });
    return response;
  }
  async getUserReservations(userId: number) {
    const token = sessionStorage["token"];
    const afterLoginAxios = axios.create({
      baseURL: "https://hotelapidemo.com",
      headers: {
        "x-access-token": token,
      },
    });
    const response = await afterLoginAxios.get(
      `/api/user/reservations/${userId}`
    );
    if (response.data === false) {
      alert("you need to login to proceed");
    }
    if (response.status === 200) return response.data;
  }

  async updateUser(user: update) {
    const token = sessionStorage["token"];
    const afterLoginAxios = axios.create({
      baseURL: "https://hotelapidemo.com",
      headers: {
        "x-access-token": token,
      },
    });
    console.log(user);
    try {
      const response = await afterLoginAxios.put("/api/user/update", user);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

export default httpService;
