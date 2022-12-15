import { useEffect, useState } from "react";
import httpService from "../app/httpService";
import { useAppSelector } from "../app/hooks";
import ReservationPropsComponent from "./ReservationPropsComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
type reservation = {
  full_name: string;
  hotel_address: string;
  hotel_location_Latitude: GLfloat;
  hotel_location_Longitude: GLfloat;
  hotel_name: string;
  hotel_rating: GLfloat;
  order_date: Date;
  order_id: number;
  rent_start_date: Date;
  rent_end_date: Date;
  user_email: string;
};

const UserReservations = () => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.id);
  const [res, setRes] = useState<reservation[]>();
  useEffect(() => {
    const token = sessionStorage["token"];
    if (isExpired(token)) {
      alert("you need to login to proceed");
      navigate("/login");
    } else {
      const getData = async (id: number) => {
        let http = new httpService();
        const response = await http.getUserReservations(id);

        console.log(response);
        if (response !== undefined) {
          setRes(response);
        }
      };
      if (userId !== null) {
        getData(userId);
      }
    }
  }, []);

  return (
    <div>
      {res?.map((reservation) => {
        return (
          <ReservationPropsComponent
            key={reservation.order_id}
            hotel_address={reservation.hotel_address}
            user_email={reservation.user_email}
            full_name={reservation.full_name}
            hotel_location_Latitude={reservation.hotel_location_Latitude}
            hotel_location_Longitude={reservation.hotel_location_Longitude}
            hotel_name={reservation.hotel_name}
            hotel_rating={reservation.hotel_rating}
            order_date={reservation.order_date}
            order_id={reservation.order_id}
            rent_end_date={reservation.rent_end_date}
            rent_start_date={reservation.rent_start_date}
          />
        );
      })}
    </div>
  );
};

export default UserReservations;
