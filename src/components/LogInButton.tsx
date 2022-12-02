import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
function LogInButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Nav.Link onClick={(e) => navigate("/login")}>log in</Nav.Link>
    </div>
  );
}

export default LogInButton;
