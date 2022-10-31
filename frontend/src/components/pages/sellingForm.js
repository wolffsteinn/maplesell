import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import SellForm from "./sellForm";
import { indexId } from "../auth";

const SellingForm = () => {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [shop, setShop] = useState([{}]);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [inputFile, setInputFile] = useState(null);

  //creating the select options for both shops and category
  let apiCalls = [
    `${process.env.REACT_APP_BACKENDURL}/home`,
    `${process.env.REACT_APP_BACKENDURL}/category`,
  ];

  useEffect(() => {
    axios
      .all(apiCalls.map((call) => axios.get(call)))
      .then(
        axios.spread((shop, category) => {
          setShopName(shop.data);
          setCategoryName(category.data);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  // map them into the select options
  const shopNameOptions = shopName.map((names) => ({
    value: names.id,
    label: names.name,
  }));

  const categoryNameOptions = categoryName.map((names) => ({
    value: names.id,
    label: names.name,
  }));

  // set the selected option from shopNameOptions / categoryNameOptions
  // need to coerce it into a [{}] so that .map recognizes it as a function??
  // because mapping you need an array
  const handleCategorySelect = (e) => {
    setCategory([e]);
  };

  const handleShopSelect = (e) => {
    setShop([e]);
  };

  const handlePhotoUpload = (e) => {
    setInputFile(e.target.files[0]);
  };

  const handleListingName = (e) => {
    setName(e.target.value);
  };

  const handleListingPrice = (e) => {
    setPrice(e.target.value);
  };

  const handleListingDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // extracting the id from selected shop/category
    const selectedCategoryId = category.map(({ value }) => value);
    const selectedShopId = shop.map(({ value }) => value);

    // just for the photo upload
    const formData = new FormData();
    formData.append("photo", inputFile);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category_id", selectedCategoryId);
    formData.append("shop_id", selectedShopId);
    formData.append("seller_id", indexId + 1);

    await axios
      .post(`${process.env.REACT_APP_BACKENDURL}/home`, formData)
      .then((res) => console.log(formData, res))
      .catch((err) => console.log(err));
    e.target.reset();
    navigate("/home");
    alert("Item listed! congrats!");
  };

  return (
    <>
      <div className="shopBackground">
        <div className="pageContainer">
          <div className="sellingFormDiv">
            <button className="shopButton" onClick={() => navigate("/home")}>
              Back to All Shops
            </button>
            <button className="shopButton" onClick={() => navigate(-1)}>
              Back to Previous Shop
            </button>
            <form className="formFonts" onSubmit={handleSubmit}>
              <h2>Selling Form</h2>
              <SellForm
                name={name}
                price={price}
                description={description}
                handleListingName={handleListingName}
                handleListingPrice={handleListingPrice}
                handleListingDescription={handleListingDescription}
              />
              <br />
              <label>Class:</label>
              <Select
                options={shopNameOptions}
                onChange={handleShopSelect}
                name="shop_id"
                value={shop}
              />
              <label>Category:</label>
              <Select
                options={categoryNameOptions}
                name="category_id"
                onChange={handleCategorySelect}
                value={category}
              />
              <br />
              <label>Photo:</label>
              <input type="file" name="photo" onChange={handlePhotoUpload} />
              <br />
              <input className="shopButton" type="submit" value="SELL!" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellingForm;
