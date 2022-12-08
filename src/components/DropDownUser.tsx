import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logOut } from "../features/user/user-slice";

interface props {
  name: string | null;
}

function DropdownUser({ name }: props) {
  const hotelId = useAppSelector((state) => state.order.hotelId);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const logOutFunc = () => {
    sessionStorage.clear();
    dispatch(logOut());
    if (
      location.pathname.startsWith("/order") ||
      location.pathname.startsWith("/reservation")
    ) {
      navigate("/");
    }
  };
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
        <NavDropdown.Item
          onClick={() => {
            logOutFunc();
          }}
        >
          log out
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}

export default DropdownUser;
