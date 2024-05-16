import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearError,
  deleteProduct,
  getAllProductAdmin,
  reset,
} from "../../../actions/productAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Sidebar from "../Admin/Sidebar";
import "./adminProduct.css";
import { Link, useNavigate } from "react-router-dom";
import Loder from "../Loader/Loder";
import MetaData from "../MetaData";
const AdminProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, productsAdmin } = useSelector(
    (state) => state.products
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.productManager
  );
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (deleteError) {
      toast.error(deleteError.message);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      dispatch(reset());
    }
    dispatch(getAllProductAdmin());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setCurrentX(e.touches[0].clientX);
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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

  return (
    <>
      {loading !== false ? (
        <Loder />
      ) : (
        <>
          <MetaData title="All Products" />
          <div
            className="_all-products-admin"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Sidebar isShown={isOpen} />
            <div className="_admin-products-list">
              {loading === false &&
                productsAdmin.map((item, index) => (
                  <div className="_admin-panel-product" key={"a" + index}>
                    <div className="_admin-panel-product-id">ID:{item._id}</div>
                    <div className="_admin-panel-product-details">
                      <div className="_ap-product-image">
                        {item.images.length === 0 ? (
                          <img src="/noimage.jpg" alt="No Preview" />
                        ) : (
                          <img
                            src={item.images[0].url}
                            alt={item.name}
                            key={index}
                          />
                        )}
                      </div>

                      <div className="_ap-product-detail">
                        <Link to={`/products/${item._id}`}>
                          <p>{item.name}</p>{" "}
                        </Link>
                        <p>
                          {" "}
                          &#8377;
                          {Intl.NumberFormat("en-IN").format(item.price)}
                        </p>
                        <p
                          style={
                            item.stock > 0
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        >
                          Stock:{item.stock}
                        </p>
                        <p>Created At:{item.createdAt.split("T")[0]}</p>
                        <div>
                          <Link to={`/admin/product/edit/${item._id}`}>
                            <Button>
                              <EditIcon />
                            </Button>
                          </Link>
                          <Button
                            onClick={() => deleteProductHandler(item._id)}
                          >
                            <DeleteIcon color="error" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminProduct;
