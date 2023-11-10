import React from "react";
import UserCard from "./UserCard";
import { Card } from "semantic-ui-react";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No users found</h2>
      </div>
    );
  }
  return (
    <Card>
      {props.items.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          image={user.image}
          fullName={user.fullName}
          email={user.email}
          personalNum={user.personalNum}
          phoneNumber={user.phoneNumber}
        />
      ))}
    </Card>
  );
};

export default UsersList;
