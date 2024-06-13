import React, { useState } from "react";
import ProductsCard from "./features/ProductCard";
import CreateProduct from "./features/CreateProduct";
import { Modal, Button, Popup, Input, Dropdown } from "semantic-ui-react";
import "./css/Product.css";

const ProductsList = (props) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [sortOption, setSortOption] = useState(""); 

  const handleCreateClose = () => {
    setOpenCreate(!openCreate);
  };


  const filteredProducts = props.products.filter((product) => {
    return product.name.toLowerCase().includes(nameFilter.toLowerCase());
  });


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

      {sortedProducts.length === 0 ? (
        <h2>No products found</h2>
      ) : (
        <div className="group-products">
          <div className="products">
            {sortedProducts.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      <Modal
        onClose={() => setOpenCreate(false)}
        onOpen={() => setOpenCreate(true)}
        open={openCreate}
        trigger={
          <Popup
            content="Create a new product"
            position="bottom center"
            trigger={
              <Button
                basic
                size="big"
                color="green"
                icon="add"
                className="create-button"
                onClick={handleCreateClose}
              />
            }
          />
        }
      >
        <Modal.Header>Create Product</Modal.Header>
        <CreateProduct closeForm={handleCreateClose} />
      </Modal>
    </>
  );
};

export default ProductsList;
