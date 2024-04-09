import React, { useEffect, useState } from "react";
import axios from "axios";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Breakfast");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submitData(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("price", price);
    if (image !== "") {
      formData.append("image", image);
    }
    console.log("inside submission", formData.get("image"));
    await axios
      .post(`${process.env.REACT_APP_API_URL}/food/create`, formData)
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          // navigate("/");
          console.log("Success");
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  }

  console.log(type);
  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    // setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  return (
    <div>
      <form onSubmit={submitData} className="p-8">
        <div className="space-y-3">
          <h3 className="text-4xl text-blackk mb-4">Create a Food Item</h3>
          <label htmlFor="Title" className="flex flex-col">
            <span className="text-2xl">Title</span>
            <input
              type="text"
              id="Title"
              placeholder="Title"
              className="input-form"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="Type" className="flex flex-col">
            <span className="text-2xl">Type</span>
            <select
              className="input-form"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option className="input-form" value="Breakfast">
                Breakfast
              </option>
              <option className="input-form" value="Lunch">
                Lunch
              </option>
            </select>
          </label>
          <label htmlFor="Price" className="flex flex-col">
            <span className="text-2xl">Price</span>
            <input
              type="number"
              id="Price"
              placeholder="Price"
              className="input-form"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label htmlFor="Image" className="flex flex-col">
            <span className="text-2xl">Image</span>
            <input
              type="file"
              id="Image"
              accept='image/*'
              placeholder="Password"
              className="input-form"
              onChange={(e) => handleImage(e)}
            />
          </label>
        </div>

        <div className="my-6 space-y-3">
          <button
            type="submit"
            className={`w-full py-4 bg-primary rounded-md text-whitee font-bold ${
              isLoading ? "opacity-60" : ""
            }`}
            disabled={isLoading}
          >
            {!isLoading ? "Create Food Item" : "Submiting..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
