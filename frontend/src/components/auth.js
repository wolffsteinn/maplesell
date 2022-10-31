import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
let currentUserId;
let userInventory;
let indexId;
let currentUserName;

const Auth = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/user`)
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const allUserEmails = [];
  for (let i = 0; i < allUsers.length; i++) {
    let userEmail = String(allUsers[i].email);
    allUserEmails.push(userEmail);
  }

  if (isAuthenticated) {
    if (allUserEmails.includes(user.email)) {
      indexId = Number(allUserEmails.indexOf(user.email));

      navigate(`/home`);

      currentUserName = allUsers[indexId].username;

      axios
        .get(`${process.env.REACT_APP_BACKENDURL}/user/${indexId - 1}`)
        .then((res) => {
          userInventory = res.data;
        })
        .catch((err) => console.log(err));
    } else if (!allUserEmails.includes(user.id)) {
      axios
        .post(`${process.env.REACT_APP_BACKENDURL}/user`, {
          email: user.email,
          password: user.password,
          username: user.nickname,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
      // }
    }

    return (
      isAuthenticated && (
        <div>
          <span>Welcome {user.nickname}</span>
        </div>
      )
    );
  }
};

export default Auth;
export { userInventory, currentUserId, indexId, currentUserName };
