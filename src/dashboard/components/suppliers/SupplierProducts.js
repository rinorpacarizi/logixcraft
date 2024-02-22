import React from "react";
import ProductsList from "../products/ProductsList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../../shared/components/Pagination";

const SupplierProducts = () => {
  const [products, setProducts] = useState([]);
  const userId = useParams().userId;

  const [currentPage, setCurrentPage] = useState(1);
  const [productInPage, setproductInPage] = useState(8);

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

  const lastProductIndex = currentPage * productInPage;
  const firstProductIndex = lastProductIndex - productInPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);
  return (
    <>
      <ProductsList products={currentProducts} />
      <Pagination totalItems={products.length} itemsPerPage={productInPage}/>
    </>
  );
};

export default SupplierProducts;
