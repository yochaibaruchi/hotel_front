import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppSelector } from "../app/hooks";
import DropdownUser from "./DropDownUser";
import LogInButton from "./LogInButton";
function TopBar() {
  const isConected = useAppSelector((state) => state.user.isConected);
  const fullName = useAppSelector((state) => state.user.fullName);
  return (
    <div>
      {isConected ? (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>
              <h1>Hotel JRM</h1>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <DropdownUser name={fullName} />
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <h1>Hotel JRM</h1>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <LogInButton></LogInButton>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default TopBar;
