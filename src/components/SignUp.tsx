import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import SignUpcard from "./SignUpCard";
function SignUp() {
  return (
    <Container>
      <Row>
        <Col>
          <SignUpcard />
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

export default SignUp;
