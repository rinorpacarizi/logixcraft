import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Card, Image } from "semantic-ui-react";

const UserCard = (props) => {
  return (
    <Card>
      <Link to={`/${props.id}/products`}>
        <Image src={props.image} alt={props.fullName} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.fullName}</Card.Header>
          <Card.Description>{props.email}</Card.Description>
          <Card.Meta>{props.personalNum}</Card.Meta>
          <Card.Meta>{props.phoneNumber}</Card.Meta>
        </Card.Content>
      </Link>
    </Card>
  );
};

export default UserCard;
