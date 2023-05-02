import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goToAddFav = () => {
    navigate("/addfav");
  };
  const goToDetails = () => {
    navigate("/details");
  };
  return (
    <div>
      <h1>Welcome to Favourite Npm packages</h1>
      <div
        style={{ padding: "200px", margin: "100px" }}
        className="border border-3  "
      >
        <p>You don't have any favs yet. Please Add.</p>
        <button
          className="btn ps-4 pe-4 text-white ms-5"
          style={{ backgroundColor: "#6558F5" }}
          onClick={goToAddFav}
        >
          Add Fav
        </button>
        <button
          className="btn ps-4 pe-4 text-white ms-5"
          style={{ backgroundColor: "#6558F5" }}
          onClick={goToDetails}
        >
          Details
        </button>
      </div>
    </div>
  );
}
