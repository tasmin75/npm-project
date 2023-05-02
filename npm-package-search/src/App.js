import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddFav from "./pages/addfav/AddFav";
import Details from "./pages/details/Details";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addfav" element={<AddFav />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}
