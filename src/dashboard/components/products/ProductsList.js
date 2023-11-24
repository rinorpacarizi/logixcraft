import React, { useState } from "react";
import ProductsCard from "./features/ProductCard";
import CreateProduct from "./features/CreateProduct";
import { Modal, Button } from "semantic-ui-react";

const ProductsList = (props) => {
  const [openCreate, setOpenCreate] = useState(false);
//  const [selectedProduct, setSekectedProduct] = useState(undefined);

  const handleCreateClose = () => {
    openCreate ? setOpenCreate(false) : setOpenCreate(true);
  };
  return (
    <>
      {props.products.length === 0 ? (
        <h2>No products found</h2>
      ) : (
        props.products.map((product) => (
          <ProductsCard
            key={product.id}
            product={product}
          />
        ))
      )}
      <Modal
        onClose={() => setOpenCreate(false)}
        onOpen={() => setOpenCreate(true)}
        open={openCreate}
        trigger={
          <Button
            basic
            color="green"
            content="Create Product"
            onClick={handleCreateClose}
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
