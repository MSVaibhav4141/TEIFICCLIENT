import React, { useEffect, useRef, useState } from "react";
import MetaData from "../MetaData";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DiscountIcon from "@mui/icons-material/Discount";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Replacement } from "../../../Utility/icons/replacement.svg";
import { ReactComponent as Cod } from "../../../Utility/icons/cashonDel.svg";
import { ReactComponent as Warranty } from "../../../Utility/icons/warranty.svg";
import { ReactComponent as FreeShipping } from "../../../Utility/icons/freeShipping.svg";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import { Button } from "@mui/material";
import Sidebar from "../Admin/Sidebar";
import "./createProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createNewProduct,
  reset,
} from "../../../actions/productAction";
import { toast } from "react-toastify";
const CreateProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const deltaX = currentX - startX;
    if (deltaX > 70) {
      // Adjust threshold as needed
      setIsOpen(true);
    } else if (deltaX < -60) {
      // Adjust threshold as needed
      setIsOpen(false);
    }
  };

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const [isWarranty, setWarranty] = useState({ opacity: "0" });
  const [isReplacable, setReplacable] = useState({ opacity: "0" });
  const [services, setServices] = useState([]);
  const handleServices = (e) => {
    if (e.target.checked) {
      setServices((prev) => [
        ...prev,
        {
          serviceType: e.target.value,
        },
      ]);
      if (e.target.value === "replacement") {
        setReplacable({ opacity: "1" });
      }
      if (e.target.value === "warranty") {
        setWarranty({ opacity: "1" });
      }
    } else {
      if (e.target.value === "replacement") {
        setReplacable({ opacity: "0" });
      }
      if (e.target.value === "warranty") {
        setWarranty({ opacity: "0" });
      }
      setServices((prev) =>
        prev.filter((i) => i.serviceType !== e.target.value)
      );
    }
  };

  const handleServicesDuration = (e) => {
    const duration = e.target.value;
    const updatedService = services.map((i) => {
      if (i.serviceType === e.target.name) {
        return { ...i, duration };
      }
      return i;
    });
    setServices(updatedService);
  };

  const { loading, error, success } = useSelector(
    (state) => state.newAdminProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [actualPrice, setActualPrice] = useState(0);
  const [technicalDetails, setTechnicalDetails] = useState("");
  const [aboutProduct, setAboutProduct] = useState("");
  const [description, setDescription] = useState("");
  const [boxContent, setBoxContent] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [loderClassName, setLoaderClassName] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const submitButton = useRef();
  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    if (services.length === 0) {
      toast.error("Please select atleast one service");
    }

    const productData = new FormData();

    productData.set("name", name);
    productData.set("price", price);
    productData.set("actualPrice", actualPrice);
    productData.set("discription", description);
    productData.set("technicalDetails", technicalDetails);
    productData.set("productAbout", aboutProduct);
    productData.set("boxContent", boxContent);
    productData.set("category", category);
    productData.set("Stock", Stock);
    productData.set(
      "servicesAvailable",
      JSON.stringify(services.sort().reverse())
    );
    productData.append("images", JSON.stringify(images));
    const serializedData = {};
    productData.forEach((value, key) => {
      serializedData[key] = value;
    });

    setLoaderClassName(true);
    dispatch(createNewProduct(serializedData));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }

    if (success) {
      toast.success("Product Created Successfully");
      naviagte("/admin/dashboard");
      setLoaderClassName(false);
      submitButton.current.innerHTML = "Create";
      dispatch(reset());
    }
  }, [dispatch, naviagte, error, success]);
  return (
    <>
      <MetaData title="Create New Products" />
      <div
        className="_create-products-admin"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Sidebar isShown={isOpen} />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <CurrencyRupeeIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <PriceChangeIcon />
              <input
                type="number"
                placeholder="Actual Price"
                required
                onChange={(e) => setActualPrice(e.target.value)}
              />
            </div>
            <div>
              <Inventory2Icon />
              <input
                type="text"
                placeholder="Box Content"
                required
                value={boxContent}
                onChange={(e) => setBoxContent(e.target.value)}
              />
            </div>
            <div>
              <DiscountIcon />
              <textarea
                placeholder="About Product"
                value={aboutProduct}
                onChange={(e) => setAboutProduct(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AssignmentIcon />
              <textarea
                placeholder="Technical Details"
                value={technicalDetails}
                onChange={(e) => setTechnicalDetails(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div className="servicesAvaialble">
              <h3>
                <EventAvailableIcon />
                Check Services That Are Available For The Product
              </h3>
              <div>
                <input
                  onChange={handleServices}
                  type="checkbox"
                  name="services"
                  value="cashOnDel"
                />
                <Cod />
                <label>COD</label>
              </div>
              <div>
                <input
                  onChange={handleServices}
                  type="checkbox"
                  name="services"
                  value="replacement"
                />
                <Replacement />
                <label>Replacement</label>
                <input
                  className="_toggle-input-transition"
                  type="number"
                  placeholder="Till How Many Days"
                  style={isReplacable}
                  onChange={handleServicesDuration}
                  name="replacement"
                />
              </div>

              <div>
                <input
                  onChange={handleServices}
                  type="checkbox"
                  name="services"
                  value="warranty"
                />
                <Warranty />
                <label>Warranty</label>
                <input
                  className="_toggle-input-transition"
                  type="number"
                  placeholder="For How Many Years"
                  style={isWarranty}
                  onChange={handleServicesDuration}
                  name="warranty"
                />
              </div>
              <div>
                <input
                  onChange={handleServices}
                  type="checkbox"
                  name="services"
                  value="freeShipping"
                />
                <FreeShipping />
                <label>Free Shipping</label>
              </div>
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              ref={submitButton}
              disabled={loading ? true : false}
            >
              <FilterTiltShiftIcon
                className={
                  loderClassName ? `loadingIconInitiate ` : `loadingIcon`
                }
              />
              <span
                style={
                  loderClassName ? { display: "none" } : { display: "block" }
                }
              >
                Create
              </span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default CreateProduct;
