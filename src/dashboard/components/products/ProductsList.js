import React, { useState } from "react";
import ProductsCard from "./features/ProductCard";
import CreateProduct from "./features/CreateProduct";
import { Modal, Button, Popup } from "semantic-ui-react";
import "./css/Product.css";

const ProductsList = (props) => {
  const [openCreate, setOpenCreate] = useState(false);
  


  const handleCreateClose = () => {
    setOpenCreate(!openCreate);
  };

 
  return (
    <>
      {props.products.length === 0 ? (
        <h2>No products found</h2>
      ) : (
        <div className="group-products">
          <div className="products">
            {props.products.map((product) => (
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
            position='bottom center'
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
