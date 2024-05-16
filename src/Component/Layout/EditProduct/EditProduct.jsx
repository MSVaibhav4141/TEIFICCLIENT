import React, { useEffect, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Replacement } from "../../../Utility/icons/replacement.svg";
import { ReactComponent as Cod } from "../../../Utility/icons/cashonDel.svg";
import { ReactComponent as Warranty } from "../../../Utility/icons/warranty.svg";
import { ReactComponent as FreeShipping } from "../../../Utility/icons/freeShipping.svg";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import { Button } from "@mui/material";
import Sidebar from "../Admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  editProduct,
  getProductDetail,
  reset,
  stateEmpty,
} from "../../../actions/productAction";
import { toast } from "react-toastify";
const EditProduct = () => {
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.editProductRed);

  const {
    error,
    product,
    loading: productLoading,
  } = useSelector((state) => state.productDetail);
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
      if (e.target.value === "cashOnDel") {
        setCod(true);
      }
      if (e.target.value === "freeShipping") {
        setFreeDel(true);
      }
      if (e.target.value === "replacement") {
        setReplacable({ opacity: "1" });
        setRep(true);
      }
      if (e.target.value === "warranty") {
        setWarranty({ opacity: "1" });
        setWarr(true);
      }
    } else {
      if (e.target.value === "cashOnDel") {
        setCod(false);
      }
      if (e.target.value === "freeShipping") {
        setFreeDel(false);
      }
      if (e.target.value === "replacement") {
        setReplacable({ opacity: "0" });
        setRep(false);
      }
      if (e.target.value === "warranty") {
        setWarranty({ opacity: "0" });
        setWarr(false);
      }
      setServices((prev) =>
        prev.filter((i) => i.serviceType !== e.target.value)
      );
    }
  };

  const handleServicesDuration = (e) => {
    const duration = e.target.value;
    if (e.target.name === "replacement") {
      setRepTime(duration);
    }
    if (e.target.name === "warranty") {
      setWarrTime(duration);
    }
    const updatedService = services.map((i) => {
      if (i.serviceType === e.target.name) {
        return { ...i, duration };
      }
      return i;
    });
    setServices(updatedService);
  };

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
  const [isCOD, setCod] = useState(false);
  const [isRep, setRep] = useState(false);
  const [isWarr, setWarr] = useState(false);
  const [warrTime, setWarrTime] = useState(0);
  const [repTime, setRepTime] = useState(0);
  const [isFreeDel, setFreeDel] = useState(false);
  const [oldImages, setOldImages] = useState([]);
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
    productData.set("stock", Stock);
    productData.set("servicesAvailable", JSON.stringify(services));
    if (images.length > 0) {
      productData.append("images", JSON.stringify(images));
    }
    const editedData = {};
    productData.forEach((value, key) => {
      editedData[key] = value;
    });

    setLoaderClassName(true);
    dispatch(editProduct({ id, editedData }));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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

  const { id } = useParams();

  useEffect(() => {
    if (
      (productLoading === undefined || productLoading === false) &&
      product._id !== id
    ) {
      dispatch(getProductDetail(id));
    } else if (productLoading === false) {
      setName(product.name);
      setDescription(product.discription);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setActualPrice(product.actualPrice);
      setAboutProduct(product.productAbout);
      setBoxContent(product.boxContent);
      setTechnicalDetails(product.technicalDetails);
      setServices(product.servicesAvailable);
      setOldImages(product.images);
      productLoading === false &&
        product.servicesAvailable.forEach((i) => {
          if (i.serviceType === "cashOnDel") {
            setCod(true);
          }
          if (i.serviceType === "freeShipping") {
            setFreeDel(true);
          }
          if (i.serviceType === "warranty") {
            setWarr(true);
            setWarranty({ opacity: "1" });
            setWarrTime(i.duration);
          }
          if (i.serviceType === "replacement") {
            setRep(true);
            setRepTime(i.duration);
            setReplacable({ opacity: "1" });
          }
        });
    }
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (updateError) {
      setLoaderClassName(false);
      toast.error(updateError.message);
      dispatch(clearError());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      naviagte("/admin/dashboard");
      dispatch(stateEmpty());
      setLoaderClassName(false);
      dispatch(reset());
    }
  }, [
    dispatch,
    naviagte,
    error,
    id,
    isUpdated,
    updateError,
    product,
    productLoading,
  ]);

  // useEffect(() => {
  //   if (isUpdated) {
  //     dispatch(getProductDetail(id));
  //   }
  // }, [isUpdated]);
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
            <Link to={`/products/${product._id}`}>
              <h1>Edit Product {product.name}</h1>
            </Link>

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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <PriceChangeIcon />
              <input
                type="number"
                placeholder="Actual Price"
                required
                value={actualPrice}
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
                  checked={isCOD}
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
                  checked={isRep}
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
                  value={repTime}
                />
              </div>

              <div>
                <input
                  onChange={handleServices}
                  type="checkbox"
                  name="services"
                  value="warranty"
                  checked={isWarr}
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
                  value={warrTime}
                />
              </div>
              <div>
                <input
                  onChange={handleServices}
                  type="checkbox"
                  name="services"
                  value="freeShipping"
                  checked={isFreeDel}
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
                value={Stock}
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
              {productLoading === false &&
                oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading || loderClassName ? true : false}
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
export default EditProduct;
