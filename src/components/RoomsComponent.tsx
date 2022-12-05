import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import httpService from "../app/httpService";
import RoomCard from "./RoomCard";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";
type room = {
  hotelId: number;
  room_capacity: number;
  image_url: string;
  hotel_name: string;
};
const RoomComponent = () => {
  const hotelId = useAppSelector((state) => state.order.hotelId);
  const startDate = useAppSelector((state) => state.order.start_date);
  const endDate = useAppSelector((state) => state.order.end_date);
  const isConnected = useAppSelector((state) => state.user.isConected);
  const [rooms, setRooms] = useState<room[]>();
  const totalPrice = useAppSelector((state) => state.order.totalPriceForNight);
  const navigate = useNavigate();
  const nav = () => {
    if (rooms !== undefined) navigate(`/order/${rooms[0].hotel_name}`);
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      you need to sign in to proceed
    </Tooltip>
  );
  useEffect(() => {
    const getRooms = async () => {
      let http = new httpService();
      const data = await http.getRooms(startDate, endDate, hotelId);
      setRooms(data);
    };
    getRooms();
  }, [hotelId, startDate, endDate]);

  return (
    <div>
      <nav className="roomsNav">
        {rooms !== undefined && <h1>{rooms[0].hotel_name}</h1>}
        {totalPrice > 0 && <h6>total price:{totalPrice} Ils per night</h6>}
        <div style={{ width: "15px" }}></div>

        {isConnected === false ? (
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button variant="dark">order</Button>
          </OverlayTrigger>
        ) : (
          <Button onClick={nav} variant="dark">
            order
          </Button>
        )}

        <div style={{ width: "15px" }}></div>
      </nav>
      <div className="container">
        {rooms?.map<JSX.Element>((room, index) => {
          return (
            <RoomCard
              key={index}
              hotelId={room.hotelId}
              url={room.image_url}
              room_capacity={room.room_capacity}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RoomComponent;
