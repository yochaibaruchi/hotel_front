import { useMemo } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Stack from "react-bootstrap/esm/Stack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { increase, Descend } from "../features/order/order-slice";
type room = {
  hotelId: number;
  room_capacity: number;
  url: string;
};
const RoomComponent = (props: room) => {
  //   const [number, setNumber] = useState<number>(0);
  const twobeds = useAppSelector((state) => state.order.twoBeds);
  const threebeds = useAppSelector((state) => state.order.threeBeds);
  const fourbeds = useAppSelector((state) => state.order.fourBeds);

  const getState = (): number => {
    if (props.room_capacity === 2) {
      return twobeds.qty;
    }
    if (props.room_capacity === 3) {
      return threebeds.qty;
    }
    if (props.room_capacity === 4) {
      return fourbeds.qty;
    } else {
      return 0;
    }
  };

  const number = useMemo(() => getState(), [twobeds, threebeds, fourbeds]);
  const price = props.room_capacity * 250 * number;
  const dispatch = useAppDispatch();

  const descendRooms = () => {
    dispatch(Descend(props.room_capacity));
  };
  const increaseRooms = () => {
    dispatch(increase(props.room_capacity));
  };

  return (
    <Card className="bg-dark text-white hotelCard">
      <Card.Img src={props.url} alt="Card image" height={"110%"} />
      <Card.ImgOverlay>
        <Card.Text>A deluxe {props.room_capacity} beds room.</Card.Text>
        <Card.Text>Last updated 3 mins ago</Card.Text>
        <Card.Body>
          <Stack direction="horizontal">
            <Card.Text>basic {props.room_capacity} beds room</Card.Text>
            <div className="ms-auto">
              <Button
                disabled={number <= 0}
                onClick={() => descendRooms()}
                variant="secondary"
              >
                -
              </Button>
              {number}
              <Button
                onClick={() => {
                  increaseRooms();
                }}
                variant="secondary"
              >
                +
              </Button>
            </div>
          </Stack>
          <Card.Text>price:{props.room_capacity * 250} ils per night</Card.Text>
        </Card.Body>
      </Card.ImgOverlay>
    </Card>
  );
};

export default RoomComponent;
