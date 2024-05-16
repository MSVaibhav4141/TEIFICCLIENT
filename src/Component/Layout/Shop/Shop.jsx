import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./shop.css";
import Loder from "../Loader/Loder";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProducts } from "../../../actions/productAction";
import ProductCard from "./productCard.jsx";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import { Button, Rating, TextField } from "@mui/material";
import MetaData from "../MetaData.js";
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const Shop = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const {
    products,
    productsCount,
    error,
    loading,
    contentPerPage,
    totalCategories,
  } = useSelector((state) => state.products);
  const _invalidPriceWarning = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const categories = [];
  const [filter, setFilterArray] = useState([]);
  const [rating, setRating] = useState(0);

  const [priceFilter, setPriceFilter] = useState({
    min: "",
    max: "",
  });
  const [priceFilter1, setPriceFilter1] = useState({
    min: "0",
    max: "10000000",
  });
  const [isSubmitDisabled, updateSubmit] = useState(false);

  const [category, setCategory] = useState("");
  const [categoryIndex, setCategoryIndex] = useState("");
  const [filterApplied, setFilter] = useState("Popularity");
  const [isOpen, setOpen] = useState(false)
  const handleSort = (e, sort) => {
    setFilter(e);
    let sortType = category.split("-")[0];
    sortType = sortType + `-${sort}`;
    setCategory(sortType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPriceFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };
  const filterProduct = (e) => {
    e.preventDefault();
    setPriceFilter1(priceFilter);
    setFilterArray((prevSet) => [...new Set([...prevSet, `Price`])]);
  };
  const removeFilter = (e) => {
    const index = filter.indexOf(e);
    setFilterArray((prevArray) => {
      const tempArray = [...prevArray];
      tempArray.splice(index, 1);
      return tempArray;
    });
    if (e === "Price") {
      setPriceFilter1(null);
    }
    if (e === "Category") {
      setCategory(null);
    }
    if (e === "Rating") {
      setRating(null);
    }
  };
  if (totalCategories !== undefined) {
    totalCategories.forEach((i) => categories.push(i));
  }
  useEffect(() => {
    if(filter.length === 0)
    setCategoryIndex("")
  }, [filter]);
  useEffect(() => {
    if (parseInt(priceFilter.min) >= parseInt(priceFilter.max)) {
      updateSubmit(true);
    } else {
      updateSubmit(false);
    }
    if (
      (priceFilter.min === "" && priceFilter.max === "") ||
      parseInt(priceFilter.min) < parseInt(priceFilter.max)
    ) {
      _invalidPriceWarning.current.classList.remove("_invalid-price");
    } else if (parseInt(priceFilter.min) >= parseInt(priceFilter.max)) {
      _invalidPriceWarning.current.classList.add("_invalid-price");
    }
  }, [priceFilter]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(
      getProducts({ keyword, currentPage, priceFilter1, category, rating })
    );
  }, [dispatch, keyword, currentPage, error, priceFilter1, category, rating]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <>
          <MetaData title="Products - TEIFIC" />
          <div className="shop">
            <div className={!isOpen ? "_product-filter" : "_product-filter _product-filter-active" }>
              <div className="_active-filters">
                <p>Filters</p>
                {filter.map((i) => (
                  <p
                  onClick={() => {
                    removeFilter(i);
                  }}
                  >
                    {i}
                  </p>
                ))}
              </div>
              <div className="_all-filters">
              <CloseIcon onClick={() => setOpen((prev) => !prev)} className="_filter-close"/>
                <label htmlFor="Price">Price</label>
                <form onSubmit={filterProduct}>
                  <div className="_filter-info">
                    <TextField
                      id="_price"
                      type="number"
                      name="min"
                      label="&#8377; Min"
                      variant="outlined"
                      value={priceFilter.min}
                      onChange={handleInputChange}
                    />
                    <span>-</span>
                    <TextField
                      id="_price"
                      type="number"
                      name="max"
                      className="_price"
                      label="&#8377; Max"
                      variant="outlined"
                      value={priceFilter.max}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitDisabled}>
                    Apply
                  </Button>
                </form>
                <p className="hidden_warning" ref={_invalidPriceWarning}>
                  Minmum amount can't exceed maximum amount!
                </p>
                <label htmlFor="category">Category</label>
                <div className="_product-filter-category">
                  <ul className="_filter-category">
                    {totalCategories === undefined ? (
                      <h2>Loading</h2>
                    ) : (
                      categories.map((item, i) => (
                        <li
                          className={
                            i === categoryIndex ? "_apply-category" : ""
                          }
                          onClick={() => {
                            setCategory(item);
                            setCategoryIndex(i);
                            setFilterArray((prevSet) => [
                              ...new Set([...prevSet, `Category`]),
                            ]);
                          }}
                        >
                          {item}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <label htmlFor="Rating">Rating</label>
                <div className="_rating-filter-shop">
                  <div className="_rating-sort">
                    <div 
                      className={rating === 5 ? "_rating-active" : ""}
                      onClick={() => {
                        setRating(5);
                        setFilterArray((prevSet) => [
                          ...new Set([...prevSet, `Rating`]),
                        ]);
                      }}
                      >
                      <Rating name="read-only" value={5} readOnly />
                      <strong>(5)</strong>
                    </div>
                    <div
                        className={rating === 4 ? "_rating-active" : ""}
                        onClick={() => {
                          setRating(4);
                        setFilterArray((prevSet) => [
                          ...new Set([...prevSet, `Rating`]),
                        ]);
                      }}
                      >
                      <Rating name="read-only" value={4} readOnly />
                      <strong>(4)</strong>
                    </div>
                    <div
                        className={rating === 3 ? "_rating-active" : ""}
                        onClick={() => {
                          setRating(3);
                          setFilterArray((prevSet) => [
                            ...new Set([...prevSet, `Rating`]),
                          ]);
                        }}
                        >
                      <Rating name="read-only" value={3} readOnly />
                      <strong>(3)</strong>
                    </div>
                    <div
                        className={rating === 2 ? "_rating-active" : ""}
                        onClick={() => {
                          setRating(2);
                          setFilterArray((prevSet) => [
                          ...new Set([...prevSet, `Rating`]),
                        ]);
                      }}
                      >
                      <Rating name="read-only" value={2} readOnly />
                      <strong>(2)</strong>
                    </div>
                    <div
                        className={rating === 1 ? "_rating-active" : ""}
                      onClick={() => {
                        setRating(1);
                        setFilterArray((prevSet) => [
                          ...new Set([...prevSet, `Rating`]),
                        ]);
                      }}
                    >
                      <Rating name="read-only" value={1} readOnly />
                      <strong>(1)</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="_product-showcase">
              <div className="_filter-sort">
                <div>
                  {keyword ? (
                    <div className="_result">
                      <span>
                        {" "}
                        Showing {(currentPage - 1) * contentPerPage + 1} -{" "}
                        {(currentPage - 1) * contentPerPage + products.length}{" "}
                        of {productsCount} results for <span>"{keyword}"</span>
                      </span>
                    </div>
                  ) : (
                    <div className="_result">
                      <span>
                        Showing {(currentPage - 1) * contentPerPage + 1} -{" "}
                        {(currentPage - 1) * contentPerPage + products.length}{" "}
                        out of {productsCount} products
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() =>
                      handleSort("Popularity", "numberOfRatings-desc")
                    }
                    name="Popularity"
                    className={
                      filterApplied === "Popularity" ? "_filter-applied" : ""
                    }
                  >
                    Popularity
                  </button>
                  <button
                    onClick={() => handleSort("Price-A", "price-asc")}
                    name="Price-A"
                    className={
                      filterApplied === "Price-A" ? "_filter-applied" : ""
                    }
                  >
                    Price: Low - High
                  </button>
                  <button
                    onClick={() => handleSort("Price-D", "price-desc")}
                    name="Price-D"
                    className={
                      filterApplied === "Price-D" ? "_filter-applied" : ""
                    }
                  >
                    Price: High - Low
                  </button>
                  <button
                    onClick={() => handleSort("New", "createdAt-desc")}
                    name="New"
                    className={filterApplied === "New" ? "_filter-applied" : ""}
                  >
                    New Arrival
                  </button>
                </div>
                <span onClick={() => setOpen((prev) => !prev)} className="_filter-mobile-view">Filters<span style={filter.length > 0 ? {display:"block"} : {display:"none"}}><FiberManualRecordIcon /></span></span>
              </div>
              <div className="_all-products">
                <div className="_product-container-all">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <div className="_shop-all-products">
                        <ProductCard product={product} />
                      </div>
                    ))
                  ) : (
                    <div className="_no-filer-result">
                      <h1>No Product Found :(</h1>
                    </div>
                  )}
                </div>
              </div>
              {(products && products.length) > 0 ? (
                <div className="_pagination-box">
                  {contentPerPage === productsCount ? (
                    <p>End of Result :)</p>
                  ) : (
                    <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={contentPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText=">"
                    prevPageText="<"
                    lastPageText=">>"
                    firstPageText="<<"
                    itemClass="_page-item"
                    linkClass="_page-link"
                    activeClass="_page-item-active"
                    activeLinkClass="_page-link-active"
                  />
                  )
                  }
                 
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Shop;
