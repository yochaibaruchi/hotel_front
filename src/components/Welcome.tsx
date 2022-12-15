import TopBar from "./TopBar";
import { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
const LoginComponent = lazy(() => import("./LoginComponent"));
const EntryPage = lazy(() => import("./EntryPage"));
const HotelsPageComponent = lazy(() => import("./HotelsPageComponent"));
const RoomComponent = lazy(() => import("./RoomsComponent"));
const OrderPageComponent = lazy(() => import("./OrderPageComponent"));
const ReservationComponent = lazy(() => import("./ReservationComponent"));
const SignUp = lazy(() => import("./SignUp"));
const UserReservations = lazy(() => import("./UserReservations"));
const EditUser = lazy(() => import("./EditUser"));
function Welcome() {
  return (
    <Router>
      <TopBar /> <br />
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/hotel" element={<HotelsPageComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/rooms" element={<RoomComponent />} />
        <Route path="/order/:hotelName" element={<OrderPageComponent />} />
        <Route
          path="reservation/:orderId/:invoiceTotal"
          element={<ReservationComponent />}
        />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/userReservations" element={<UserReservations />} />
        <Route path="/EditUser" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default Welcome;
