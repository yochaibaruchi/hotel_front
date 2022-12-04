import TopBar from "./TopBar";
import { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
const LoginComponent = lazy(() => import("./LoginComponent"));
const EntryPage = lazy(() => import("./EntryPage"));
const HotelsPageComponent = lazy(() => import("./HotelsPageComponent"));
const RoomComponent = lazy(() => import("./RoomsComponent"));
const OrderPageComponent = lazy(() => import("./OrderPageComponent"));
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
      </Routes>
    </Router>
  );
}

export default Welcome;
