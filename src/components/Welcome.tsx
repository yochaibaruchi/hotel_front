import TopBar from "./TopBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import EntryPage from "./EntryPage";
import HotelsPageComponent from "./HotelsPageComponent";
import RoomComponent from "./RoomsComponent";
import OrderPageComponent from "./OrderPageComponent";
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
