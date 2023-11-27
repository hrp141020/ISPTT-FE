import React from "react";

const RedLabel = ({ message }) => {
  const labelStyle = {
    color: 'red',
    'fontSize': '.875em'
  };

  return (
    <label style={labelStyle}>{message || 'This field is required'}</label>
  );
};

export default RedLabel;