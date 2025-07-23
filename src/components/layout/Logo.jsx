import React from "react";
import logo from "../../assets/images/logo.png"; // Update the path as needed

const Logo = () => {
  return (
    <div className="flex justify-center ">
      <img src={logo} alt="Fleetify Logo" className="w-38 h-auto object-contain" />
    </div>
  );
};

export default Logo;
