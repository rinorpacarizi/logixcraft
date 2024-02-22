import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsCard from "./features/ProductCard";
import "./css/Product.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productInPage, setproductInPage] = useState(8);
  useEffect(() => {
    const getProducts = async () => {
      try {
        await axios
          .get(`http://localhost:5000/api/products/`)
          .then((response) => {
            setProducts(response.data.products);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const lastProductIndex = currentPage * productInPage;
  const firstProductIndex = lastProductIndex - productInPage;
  const currentProduct = products.slice(firstProductIndex, lastProductIndex);
  return (
    <>
      <div className="group-products">
        <div className="products">
          {products.map((product) => (
            <ProductsCard key={product.id} product={currentProduct} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
