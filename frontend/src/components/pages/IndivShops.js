import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ShopItems from "./ShopItems";
import { clickToNull, currSelectedDiv } from "./ShopItems";
import employee from "../img/employee.png";
import BuyDialog from "./buyDialog";
import { indexId, currentUserName } from "../auth";
import UserItems from "./UserItems";

const IndivShops = () => {
  const [buyingPopup, setBuyingPopup] = useState(false);
  const [indivShops, setIndivShops] = useState([]);
  const [userInventory, setUserInventory] = useState([]);
  let { shopId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/home/${shopId}`)
      .then((res) => {
        setIndivShops(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/user/${indexId + 1}`)
      .then((res) => {
        setUserInventory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const shopItems = indivShops.map((shopItem, i) => {
    return <ShopItems shopItem={shopItem} key={i + 1} />;
  });

  const userItems = userInventory.map((userItem, i) => {
    return <UserItems shopItem={userItem} key={i + 1} />;
  });

  const handleBuyingConfirmation = () => {
    setBuyingPopup(true);
  };

  const handleClose = () => {
    setBuyingPopup(false);
  };

  const handleBuy = async () => {
    if (currSelectedDiv == null) {
      alert("You havent clicked on anything!");
      return;
    }

    let itemStatus = {
      id: currSelectedDiv,
      bought: true,
      buyer_id: indexId + 1,
    };

    await axios
      .put(`${process.env.REACT_APP_BACKENDURL}/home/${shopId}`, itemStatus)
      .then((res) => console.log("Posted", res, itemStatus))
      .catch((err) => console.log(err));
    navigate(`/home`);
    alert("Item bought! congrats!");
    clickToNull();
  };

  return (
    <>
      <div className="shopBackground">
        <div className="pageContainer">
          <div className="shopDiv">
            <div className="topContainer">
              <div className="employeeContainer">
                <img src={employee} className="employee" alt="employee" />
              </div>
              <div className="buttonContainer">
                <div className="divButtons">
                  <button
                    onClick={handleBuyingConfirmation}
                    className="shopButton"
                  >
                    BUY ITEM
                  </button>
                </div>

                <div className="divButtons">
                  <button
                    onClick={() => {
                      clickToNull();
                      navigate("/new");
                    }}
                    className="shopButton"
                  >
                    SELL ITEM
                  </button>
                </div>

                <div className="divButtons">
                  <button
                    className="shopButton"
                    onClick={() => {
                      clickToNull();
                      navigate("/home");
                    }}
                  >
                    LEAVE STORE
                  </button>
                </div>
              </div>
            </div>

            <BuyDialog
              buyingPopup={buyingPopup}
              handleBuy={handleBuy}
              handleClose={handleClose}
            />

            <div className="shopItems">{shopItems}</div>
          </div>
          <div className="userDiv">
            <div>
              <div className="topContainer">
                <h2 className="userName">{currentUserName} Inventory</h2>
              </div>
              <div className="userItems">{userItems}</div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default IndivShops;
