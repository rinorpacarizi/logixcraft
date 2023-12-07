import React, { useState, useEffect } from "react";
import UsersList from "./components/UsersList";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getusers = async () => {
      await axios
        .get("http://localhost:5000/api/users/suppliers")
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getusers();
  }, []);
  return <UsersList users={users} />;
};
export default User;
