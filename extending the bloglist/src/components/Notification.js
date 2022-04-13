import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  if (message === "") {
    return "";
  }

  const alertStyle = {
    textAlign: "center",
  };

  return (
    <Alert style={alertStyle} variant="success">
      {message}
    </Alert>
  );
};

export default Notification;
