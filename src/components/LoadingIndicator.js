import React from "react";
import Loader from "react-loader-spinner";
const LoadingIndicator = ({ type, color }) => {
  return (
    <Loader
      type={type}
      color={color}
      height={100}
      width={100}
    //   timeout={3000} //3 secs
    />
  );
};

export default LoadingIndicator;
