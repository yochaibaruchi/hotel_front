import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginCard from "./LoginCard";
import Image from "react-bootstrap/Image";
import { useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function LoginComponent() {
  const navigate = useNavigate();
  const isConected = useAppSelector((state) => state.user.isConected);
  useEffect(() => {
    if (isConected) navigate(-2);
  });
  return (
    <Container>
      <Row>
        <Col>
          <LoginCard />
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

export default LoginComponent;
