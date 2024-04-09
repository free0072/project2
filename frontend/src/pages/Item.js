import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalState } from "../middlewares/global-states";
import Cookies from "js-cookie";

const Item = () => {
  const params = useParams();
  const [currentItem, setcurrentItem] = useState(null);
  const [quantity, setQuantity] = useState(1); // Add quantity state
  const { data, dispatch } = useContext(GlobalState);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/food/${params.id}`)
      .then((res) => setcurrentItem(res.data))
      .catch((err) => console.log(err));
  }, [params.id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} />);
    }
    if (rating - fullStars >= 0.5) {
      stars.push(<BsStarHalf key={stars.length} />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStar key={stars.length} />);
    }
    return stars;
  };

  const handleAddToCart = () => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    console.log(data)
    const currentUser = data.loggedUser.role.toLowerCase();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/booking/create`,
        { food: currentItem._id, quantity: quantity, time: currentItem.type },
        { headers }
      )
      .then((res) => {
        res.status === 201 && navigate(`/${currentUser}`);
      })
      .catch((err) => console.error(err));
  };

  const handleIncreaseQuantity = () => {
      if(quantity<params.quantity){
        setQuantity(quantity + 1);
      }
      if(params.quantity==0) {

        setQuantity(quantity + 1);
      }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      {currentItem ? (
        <div className="w-full flex justify-center my-6 bg-light px-4 select-none">
          <div className="w-full max-w-7xl border-2 flex flex-col md:flex-row justify-between bg-white mb-4 shadow-lg">
            <div className="w-full md:w-5/12 p-4 text-center">
              <div className="border-2 p-4 flex justify-center">
                <img src={currentItem.img} alt="" className="max-h-[40vh]" />
              </div>
            </div>
            <div className="w-full md:w-7/12 flex flex-col p-4 space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{currentItem.title}</h1>
              </div>
              <div className="pr-4">
                <p className="text-xl text-slate-500">{currentItem.type}</p>
              </div>
              <div className="flex space-x-4">
                <div className="flex space-x-2 text-yellow-600 items-center">
                  {renderStars(4)}
                  <p>4</p>
                </div>
                <p>266</p>
              </div>
              {params.quantity>0 ? (
                <div>
                  <p className="text-xl text-blackk">Quantity Left: {params.quantity}</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl">${currentItem.price}</p>
                </div>
              )}

              <div className=" mt-4">
                <div className="flex items-center my-4">
                  <button
                    className="bg-slate-600 text-white px-3 rounded-2xl"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </button>
                  <span className="text-xl mx-2">{quantity}</span>
                  <button
                    className="bg-slate-600 text-white px-3 rounded-2xl"
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-primary text-white btn"
                  onClick={handleAddToCart}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Item;
