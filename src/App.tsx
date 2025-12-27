import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MainScreen from "./screen/MainScreen";
import RoomDetail from "./screen/RoomDetail";
import AdminScreen from "./screen/AdminScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/RoomDetail/:roomId" element={<RoomDetail />} />
          <Route path="/Admin" element={<AdminScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
