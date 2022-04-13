import React from "react";
import { Link } from "react-router-dom";

const Header = ({ text, user, handleLogout }) => {
  const padding = {
    padding: 5,
  };

  return (
    <>
      <div>
        <h1>{text}</h1>
      </div>
      {user === null ? (
        ""
      ) : (
        <div className="header-menu">
          <div>
            <Link style={padding} to="/">
              <strong>home</strong>
            </Link>
          </div>
          <div>
            <Link style={padding} to="/users">
              <strong>users</strong>
            </Link>
          </div>
          <div>
            <p>
              <strong>{`'${user.name}' logged-in`}</strong>
            </p>
          </div>
          <div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
