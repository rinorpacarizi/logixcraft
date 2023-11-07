import React from "react";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No Users found</h2>
      </div>
    );
  }
  return <div>UsersList</div>;
};

export default UsersList;
