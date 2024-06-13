import React, { useEffect, useState } from "react";
import ProductsList from "../products/ProductsList";
import { useParams } from "react-router-dom";
import axios from "axios";
import supplier from './supplier.css'
import { Pagination } from "semantic-ui-react";

const SupplierProducts = () => {
  const [products, setProducts] = useState([]);
  const userId = useParams().userId;

  const [currentPage, setCurrentPage] = useState(1);
  const [productInPage, setProductInPage] = useState(8);

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
  const totalPages = Math.ceil(products.length / productInPage);
  const handlePageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  return (
    <>
      <ProductsList products={currentProducts} />
      <Pagination
        defaultActivePage={1}
        firstItem={null}
        lastItem={null}
        pointing
        secondary
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="pagination"
      />
    </>
  );
};

export default SupplierProducts;
