import Card from "react-bootstrap/esm/Card";
import LogIn from "./LogIn";
import { useNavigate } from "react-router-dom";
function LoginCard() {
  const navigate = useNavigate();
  return (
    <Card
      style={{ width: "20rem", backgroundColor: "darkgray", height: "30rem" }}
    >
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <LogIn />
        <Card.Link onClick={() => navigate("/SignUp")}>to signin</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default LoginCard;
