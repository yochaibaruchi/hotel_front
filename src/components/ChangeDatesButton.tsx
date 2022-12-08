import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { newOrder } from "../features/order/order-slice";
const ChangeDatesbutton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [clickInnerText, setClickInnerText] = useState("");
  useEffect(() => {
    if (location.pathname.startsWith("/res")) {
      setClickInnerText("new order?");
    } else {
      setClickInnerText("Change dates");
    }
  }, [location.pathname]);

  const orderdClick = () => {
    navigate("/");
    dispatch(newOrder());
  };
  return (
    <Nav.Link disabled={location.pathname === "/"} onClick={orderdClick}>
      {clickInnerText}
    </Nav.Link>
  );
};

export default ChangeDatesbutton;
