import { indexId, currentUserName } from "../auth";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profilePage.css";

const ProfilePage = () => {
  const [userInventory, setUserInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/user/${indexId + 1}`)
      .then((res) => {
        setUserInventory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const userInventoryFunction = userInventory.map((inventory) => {
    return (
      <>
        <div className="profilePage">
          <img
            src={
              inventory.photo.startsWith("http")
                ? inventory.photo
                : `${process.env.REACT_APP_BACKENDURL}/${inventory.photo}`
            }
            alt={inventory.name}
            className="itemPhoto"
          />
          <div>{inventory.name}</div>
          <br />
          <div>{inventory.description}</div>
        </div>
      </>
    );
  });

  return (
    <div className="homeContainerProfile">
      <h2>{currentUserName}'s inventory</h2>
      {userInventoryFunction}
      <button
        className="shopButton"
        onClick={() => {
          navigate(`/home`);
        }}
      >
        Back
      </button>
    </div>
  );
};
export default ProfilePage;
