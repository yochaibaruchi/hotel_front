import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import httpService from "../app/httpService";
import { useAppSelector } from "../app/hooks";
import Table from "react-bootstrap/esm/Table";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";
type data = {
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
const ReservationComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage["token"];
    if (isExpired(token)) {
      alert("you need to login to proceed");
      navigate("/login");
    }
  }, []);
  const twoBeds = useAppSelector((state) => state.order.twoBeds.qty);
  const threeBeds = useAppSelector((state) => state.order.threeBeds.qty);
  const fourBeds = useAppSelector((state) => state.order.fourBeds.qty);
  const { orderId, invoiceTotal } = useParams();
  const [res, setRes] = useState<data>();
  useEffect(() => {
    const getData = async () => {
      let http = new httpService();
      if (orderId !== undefined) {
        let data = await http.reservation(orderId);
        if (data !== undefined) {
          data.order_date = new Date(data.order_date);
          data.rent_start_date = new Date(data.rent_start_date);
          data.rent_end_date = new Date(data.rent_end_date);
          setRes(data);
        }
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Order number</th>
            <th>Order date</th>
            <th>Ordered by</th>
            <th>Hotel</th>
            <th>Hotel address</th>
            <th>From</th>
            <th>To</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{res?.order_id}</td>
            <td>{res?.order_date.toDateString()}</td>
            <td>{res?.full_name}</td>
            <td>{res?.hotel_name}</td>
            <td>{res?.hotel_address}</td>
            <td>{res?.rent_start_date.toDateString()}</td>
            <td>{res?.rent_end_date.toDateString()}</td>
            <td>{res?.user_email}</td>
          </tr>
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <th>content</th>
          </tr>
        </thead>
        <tbody>
          {twoBeds > 0 && (
            <tr>
              <td>{twoBeds} room/s with 2 beds </td>
            </tr>
          )}
          {threeBeds > 0 && (
            <tr>
              <td>{threeBeds} room/s with 3 beds </td>
            </tr>
          )}
          {fourBeds > 0 && (
            <tr>
              <td>{fourBeds} room/s with 4 beds </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <th>For Total price of</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invoiceTotal} Israeli New Shekel</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ReservationComponent;
