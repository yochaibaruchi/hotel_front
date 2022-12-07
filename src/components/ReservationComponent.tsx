import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import httpService from "../app/httpService";
type data = {
  full_name: string;
  hotel_address: string;
};
const ReservationComponent = () => {
  const { orderId } = useParams();
  const [reservation, setReservation] = useState();
  useEffect(() => {
    const getReservation = async () => {
      const http = new httpService();
      if (orderId !== undefined) {
        let id = parseInt(orderId);
        const data = await http.reservation(id);
        console.log(data);
      }
    };
    getReservation();
  }, []);

  return <div>{orderId}</div>;
};

export default ReservationComponent;
