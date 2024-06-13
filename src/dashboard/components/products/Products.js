import React, { useEffect, useState } from "react";
import { Input, Dropdown, Pagination } from "semantic-ui-react";
import axios from "axios";
import ProductsCard from "./features/ProductCard";
import "./css/Product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [nameFilter, setNameFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/`);
        setProducts(response.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "stock-asc":
        return a.stock - b.stock;
      case "stock-desc":
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(
    firstProductIndex,
    lastProductIndex
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const sortOptions = [
    { key: 'price-desc', value: 'price-desc', text: 'Price ↑' },
    { key: 'price-asc', value: 'price-asc', text: 'Price ↓' },
    { key: 'name-asc', value: 'name-asc', text: 'Name A-Z' },
    { key: 'name-desc', value: 'name-desc', text: 'Name Z-A' },
    { key: 'stock-asc', value: 'stock-asc', text: 'Stock ↓' },
    { key: 'stock-desc', value: 'stock-desc', text: 'Stock ↑' },
  ];

  return (
    <>
      <div className="filters">
        <Input
          icon="search"
          placeholder="Search product"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <Dropdown
          placeholder="Sort by"
          selection
          options={sortOptions}
          onChange={(e, { value }) => setSortOption(value)}
        />
      </div>
      <div className="group-products">
        <div className="products">
          {currentProducts.length === 0 ? (
            <h2>No products found</h2>
          ) : (
            currentProducts.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
      <Pagination
        firstItem={null}
        lastItem={null}
        pointing
        secondary
        activePage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        className="pagination"
      />
    </>
  );
};

export default Products;
