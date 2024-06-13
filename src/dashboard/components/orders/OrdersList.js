import React, { useState } from "react";
import OrdersCard from "./features/OrdersCard";
import { Button, List, Popup, Pagination, Input, Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./css/Order.css";

const OrdersList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(7);
  const [nameFilter, setNameFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const history = useHistory();

  const handleCreateClose = () => {
    history.push("/products");
  };

  const filteredOrders = props.orders.filter((order) =>
    order.productName.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const sortedOrders = filteredOrders.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.productName.localeCompare(b.productName);
      case "name-desc":
        return b.productName.localeCompare(a.productName);
      case "amount-asc":
        return a.amount - b.amount;
      case "amount-desc":
        return b.amount - a.amount;
      case "status-asc":
        return a.status.localeCompare(b.status);
      case "status-desc":
        return b.status.localeCompare(a.status);
      default:
        return 0;
    }
  });

  const sortOptions = [
    { key: 'price-asc', value: 'price-asc', text: 'Price Low to High' },
    { key: 'price-desc', value: 'price-desc', text: 'Price High to Low' },
    { key: 'name-asc', value: 'name-asc', text: 'Name A-Z' },
    { key: 'name-desc', value: 'name-desc', text: 'Name Z-A' },
    { key: 'amount-asc', value: 'amount-asc', text: 'Amount Low to High' },
    { key: 'amount-desc', value: 'amount-desc', text: 'Amount High to Low' },
    { key: 'status-asc', value: 'status-asc', text: 'Status A-Z' },
    { key: 'status-desc', value: 'status-desc', text: 'Status Z-A' },
  ];

  const lastOrderIndex = currentPage * ordersPerPage;
  const firstOrderIndex = lastOrderIndex - ordersPerPage;
  const currentOrders = sortedOrders.slice(firstOrderIndex, lastOrderIndex);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  const handlePageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const handleFilterChange = (e) => {
    setNameFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const handleSortChange = (e, { value }) => {
    setSortOption(value);
    setCurrentPage(1); // Reset to the first page on sort change
  };

  return (
    <>
      <div className="filters">
        <Input
          icon="search"
          placeholder="Search orders"
          value={nameFilter}
          onChange={handleFilterChange}
        />
        <Dropdown
          placeholder="Sort by"
          selection
          options={sortOptions}
          onChange={handleSortChange}
        />
      </div>
      {currentOrders.length === 0 ? (
        <h2>No orders found</h2>
      ) : (
        <>
          <div className="group-orders">
            <div className="orders">
              <List verticalAlign="middle" relaxed="very" className="order">
                <List.Item>
                  <List.Header>Image</List.Header>
                  <List.Content className="list-header">
                    <List.Header>Name</List.Header>
                    <List.Description>Amount</List.Description>
                    <List.Description>Total Price</List.Description>
                    <List.Description>Status</List.Description>
                  </List.Content>
                </List.Item>
              </List>
              {currentOrders.map((order) => (
                <OrdersCard key={order.id} order={order} />
              ))}
            </div>
          </div>
          <Popup
            content="Order a new product"
            position="bottom center"
            trigger={
              <Button
                basic
                size="big"
                color="green"
                icon="add"
                className="create-order-button"
                onClick={handleCreateClose}
              />
            }
          />
        </>
      )}
      <Pagination
        activePage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        className="pagination"
        firstItem={null}
        lastItem={null}
        pointing
        secondary
      />
    </>
  );
};

export default OrdersList;
