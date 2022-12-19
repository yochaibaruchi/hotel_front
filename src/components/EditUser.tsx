import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import UpdateUserCard from "./UpdateUserCard";
import { isExpired } from "react-jwt";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
function EditUser() {
  const navigate = useNavigate();
  const isConected = useAppSelector((state) => state.user.isConected);
  useEffect(() => {
    const token = sessionStorage["token"];
    if (isExpired(token)) {
      alert("you need to login to proceed");
      navigate("/login");
    }
  }, [isConected]);
  return (
    <Container>
      <Row>
        <Col>
          <UpdateUserCard />
        </Col>
        <Col>
          <Image
            fluid
            alt="hotel room image"
            src="https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg"
          ></Image>
        </Col>
      </Row>
    </Container>
  );
}

export default EditUser;
