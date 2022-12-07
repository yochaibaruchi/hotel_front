import NavDropdown from "react-bootstrap/NavDropdown";
import { useAppSelector } from "../app/hooks";
interface props {
  name: string | null;
}

function DropdownUser({ name }: props) {
  const hotelId = useAppSelector((state) => state.order.hotelId);
  return (
    //finish drop down
    <div>
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={name}
        menuVariant="dark"
      >
        <NavDropdown.Item>profile</NavDropdown.Item>
        <NavDropdown.Item disabled={hotelId === null}>
          back into
        </NavDropdown.Item>
        <NavDropdown.Item>log out</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}

export default DropdownUser;
