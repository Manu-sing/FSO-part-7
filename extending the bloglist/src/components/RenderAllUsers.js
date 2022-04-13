import React from "react";
import { Link } from "react-router-dom";

const RenderAllUsers = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link to={`/user/${user.id}`}>{user.name}</Link>
          <p>Blogs created: {user.blogs.length}</p>
        </li>
      ))}
    </ul>
  );
};

export default RenderAllUsers;
