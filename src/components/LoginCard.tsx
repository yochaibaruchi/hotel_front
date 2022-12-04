import Card from "react-bootstrap/esm/Card";
import LogIn from "./LogIn";

function LoginCard() {
  return (
    <Card
      style={{ width: "20rem", backgroundColor: "darkgray", height: "30rem" }}
    >
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <LogIn />
        <Card.Link href="#">to signin</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default LoginCard;
