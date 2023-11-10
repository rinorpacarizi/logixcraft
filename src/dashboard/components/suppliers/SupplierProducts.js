import React from "react";
import ProductsList from "../products/ProductsList";
import {useParams} from 'react-router-dom'

const DUMMY_PRODUCTS = [
  {
      id: "p1",
      name: "Sweeties",
      type: "Consumables",
      image:
        "https://www.checkers.co.za/medias/10379624EA-checkers515Wx515H?context=bWFzdGVyfGltYWdlc3wzMDI2ODF8aW1hZ2UvcG5nfGltYWdlcy9oODAvaDFjLzg5MzAxODgxNjUxNTAucG5nfGI0NjdiYzBhZmRkNjI0Nzk1MzUyODg4MzdmMGJkNmExMDdmNmJmYjNlMmNhOGFjMjcxMTUyNTE4MzZlMDE4YjI",
        price: 5.99,
      amount: { stock: 0, ordered: 11, preOrdered: 1 },
      creator: "u1",
    },
    {
      id: "p2",
      name: "Sweeties",
      type: "Consumables",
      image:
      "https://www.checkers.co.za/medias/10379624EA-checkers515Wx515H?context=bWFzdGVyfGltYWdlc3wzMDI2ODF8aW1hZ2UvcG5nfGltYWdlcy9oODAvaDFjLzg5MzAxODgxNjUxNTAucG5nfGI0NjdiYzBhZmRkNjI0Nzk1MzUyODg4MzdmMGJkNmExMDdmNmJmYjNlMmNhOGFjMjcxMTUyNTE4MzZlMDE4YjI",
      price: 6.99,
      amount: { stock: 6, ordered: 11, preOrdered: 1 },
      creator: "u2",
    },
  ];
  const SupplierProducts = () => {
    const userId = useParams().userId;
    const products = DUMMY_PRODUCTS.filter(product => product.creator === userId)
  return <ProductsList items={products} />;
};

export default SupplierProducts;
