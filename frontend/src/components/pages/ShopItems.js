import React, { useState } from "react";
import mesos from "../img/mesos.png";

var currSelectedDiv = null; // use this variable to buy item later
var clickedDiv = null;

const clickToNull = () => {
  currSelectedDiv = null;
  clickedDiv = null;
};

const ShopItems = ({ shopItem }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [clicked, setClicked] = useState(false); //if true, change colour

  // if img path is without http, attach it before showing the photowwww
  const imageUrl = () => {
    if (shopItem.photo.startsWith("http")) {
      return shopItem.photo;
    } else {
      return `${process.env.REACT_APP_BACKENDURL}/${shopItem.photo}`;
    }
  };

  const handleClick = () => {
    clickedDiv = shopItem.id;

    if (currSelectedDiv === null) {
      currSelectedDiv = clickedDiv;
    } else if (currSelectedDiv === clickedDiv) {
      currSelectedDiv = null;
    } else if (currSelectedDiv !== clickedDiv) {
      console.log(
        `currSelected is ${currSelectedDiv} but clicked on ${clickedDiv}`
      );
      return;
    }
    setClicked(!clicked);
  };

  return (
    <>
      <div
        className="items"
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        onClick={handleClick}
      >
        <div className="itemLeft">
          <img src={imageUrl()} alt={shopItem.name} className="itemPhoto" />
        </div>
        <div className="itemRight">
          <div className={`itemName ${clicked ? "clickedColour" : ""}`}>
            {/* but doesnt seem to work if you re-click */}
            {/* have to change it to span for the reds to disappear */}
            <p className="itemText">{shopItem.name}</p>
          </div>

          <div className={`price ${clicked ? "clickedColour" : ""}`}>
            <img src={mesos} className="mesos" alt="mesos: " />
            {/* have to change it to span for the reds to disappear */}
            <p className="priceText">{shopItem.price} mesos</p>
            <br />
          </div>
        </div>
      </div>

      {isHovering && (
        <div className="itemDisplay">
          <>
            <img src={imageUrl()} alt={shopItem.name} />
            <p>{shopItem.name}</p>
          </>
          <p>{shopItem.description}</p>
        </div>
      )}
    </>
  );
};

export { clickToNull, clickedDiv, currSelectedDiv };
export default ShopItems;
