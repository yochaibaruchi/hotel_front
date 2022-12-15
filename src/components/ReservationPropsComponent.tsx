import Table from "react-bootstrap/esm/Table";
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
const ReservationPropsComponent = (props: data) => {
  const rent_end_date = new Date(props.rent_end_date);
  const rent_start_date = new Date(props.rent_start_date);
  const order_date = new Date(props.order_date);
  return (
    <div>
      <Table border={1}>
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
            <td>{props?.order_id}</td>
            <td>{order_date.toDateString()}</td>
            <td>{props?.full_name}</td>
            <td>{props?.hotel_name}</td>
            <td>{props?.hotel_address}</td>
            <td>{rent_start_date.toDateString()}</td>
            <td>{rent_end_date.toDateString()}</td>
            <td>{props?.user_email}</td>
          </tr>
        </tbody>
      </Table>
      <br />
    </div>
  );
};

export default ReservationPropsComponent;
