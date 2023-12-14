import React from "react";
import ProductsList from "../products/ProductsList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SupplierProducts = () => {
  const [products, setProducts] = useState([]);
  const userId = useParams().userId;

  
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(`http://localhost:5000/api/products/user/${userId}`)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProducts();
  }, [userId]);

  return <ProductsList products={products} />;
};

export default SupplierProducts;