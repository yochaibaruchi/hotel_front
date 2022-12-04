import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Stack from "react-bootstrap/Stack";
import Map from "./Map";
import { changeHotelId } from "../features/order/order-slice";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
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

function HotelCard(props: hotel) {
  const lastHotelId = useAppSelector((state) => state.order.hotelId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);

  const onclick = () => {
    if (props.hotel_id !== lastHotelId) dispatch(changeHotelId(props.hotel_id));
    navigate("/rooms");
  };
  return (
    <Card
      className={"hotelCard"}
      onMouseEnter={() => {
        setFlag1(!flag1);
      }}
      onMouseLeave={() => {
        setFlag1(!flag1);
      }}
    >
      <Stack direction="vertical">
        <Card.Img variant="top" height={"200px"} src={props.hotel_pic_path} />
        <Card.Body style={{ alignItems: "baseline" }}>
          <Card.Title>{props.hotel_name}</Card.Title>
          <Card.Text>{props.hotel_address}</Card.Text>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setFlag((correntFlag) => (correntFlag = !correntFlag));
              }}
            >
              map
            </Button>
            <Button variant="secondary" size="sm" onClick={onclick}>
              find rooms
            </Button>
          </div>
          <Card.Footer>
            <Stack direction="horizontal">
              <Card.Text>
                rating: {props.hotel_rating}{" "}
                {props.rooms_left < 4
                  ? `rooms left: ${props.rooms_left}`
                  : null}
              </Card.Text>
            </Stack>
          </Card.Footer>
          {flag && (
            <Map
              lat={props.hotel_location_Latitude}
              lng={props.hotel_location_Longitude}
              hotelName={props.hotel_name}
              flag={flag1}
            />
          )}
        </Card.Body>
      </Stack>
    </Card>
  );
}

export default HotelCard;
