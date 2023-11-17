import React, { useState } from "react";
import ProductsCard from "./features/ProductCard";
import CreateProduct from "./features/CreateProduct";
import { Modal, Button } from "semantic-ui-react";

const ProductsList = (props) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedProduct, setSekectedProduct]= useState(undefined);

  
  const handleCreateClose = () => {
    openCreate ? setOpenCreate(false) : setOpenCreate(true);
  }
  if (props.items.length === 0) {
    return <h2>No products found</h2>;
  }

  const handleDeleteProduct= (id)=> {
    //agent.Buses.delete(id).then(() => {
      //setBuses([...buses.filter((x) => x.id !== id)]);
    };
  
  return (
    <div>
      {props.items.map((product) => (
        <ProductsCard
          key={product.id}
          id={product.id}
          name={product.name}
          type={product.type}
          image={product.image}
          price={product.price}
          amount={product.amount}
          creator={product.creator}
          deleteProduct={handleDeleteProduct}
        />
      ))}
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
        <Modal.Header>
            Create Product
          </Modal.Header>
      <CreateProduct closeForm={handleCreateClose} />
      </Modal>
    </div>
  );
};

export default ProductsList;
