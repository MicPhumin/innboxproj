import "./App.css";
import { Route, Routes } from "react-router";
import MainScreen from "./screen/MainScreen";
import RoomDetail from "./screen/RoomDetail";
import AdminScreen from "./screen/AdminScreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/roomdetail/:roomId" element={<RoomDetail />} />
        <Route path="/admin" element={<AdminScreen />} />
      </Routes>
    </>
  );
}

export default App;
