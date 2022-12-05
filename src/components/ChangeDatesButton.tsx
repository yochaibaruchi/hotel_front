import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
const ChangeDatesbutton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Nav.Link onClick={(e) => navigate("/")}>change dates</Nav.Link>
    </div>
  );
};

export default ChangeDatesbutton;
