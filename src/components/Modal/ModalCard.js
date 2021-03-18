import React from "react";
import { CModal } from "@coreui/react";


const ModalCard = ({ isOpen, children }) => {
  return <CModal show={isOpen} style={{
      marginTop:'100px',
      width:'500Px',
      height:'500px',
  }}>{children}</CModal>;
};

export default ModalCard;
