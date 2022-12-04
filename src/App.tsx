import Welcome from "./components/Welcome";
import "./App.css";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
function App() {
  return (
    <Suspense fallback={<Spinner animation="grow" />}>
      <div style={{ backgroundColor: "whitesmoke" }}>
        <Welcome />
      </div>
    </Suspense>
  );
}

export default App;
