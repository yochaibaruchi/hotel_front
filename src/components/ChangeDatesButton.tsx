import Nav from "react-bootstrap/Nav";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { newOrder } from "../features/order/order-slice";
const ChangeDatesbutton = () => {
  const orderd = useAppSelector((state) => state.order.ordered);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orderdClick = () => {
    dispatch(newOrder());
    navigate("/");
  };
  return (
    <div>
      {orderd ? (
        <Nav.Link
          disabled={location.pathname === "/"}
          onClick={() => orderdClick}
        >
          new order?
        </Nav.Link>
      ) : (
        <Nav.Link
          disabled={location.pathname === "/"}
          onClick={() => navigate("/")}
        >
          change dates
        </Nav.Link>
      )}
    </div>
  );
};

export default ChangeDatesbutton;
