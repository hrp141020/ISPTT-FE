import React from "react";

const RedLabel = () => {
  const labelStyle = {
    color: 'red',
    'fontSize': '.875em'
  };

  return (
    <label style={labelStyle}>This field is required</label>
  );
};

export default RedLabel;