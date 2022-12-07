import { useParams } from "react-router-dom";
import { useEffect } from "react";
import httpService from "../app/httpService";
const ReservationComponent = () => {
  const { orderId } = useParams();

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
