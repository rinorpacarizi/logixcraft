import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsCard from "./features/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
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

  return (
    <>
      {products.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </>
  );
};

export default Products;
