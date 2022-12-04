import { beforeLoginAxios } from "./axios";

type room = {
  hotelId: number;
  room_capacity: number;
  image_url: string;
  hotel_name: string;
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

  async getMapKey() {
    const { data } = await beforeLoginAxios.get<string>("/api/hotel/map");
    return data;
  }
}

export default httpService;
