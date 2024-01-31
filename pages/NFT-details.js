import React from "react";

import { Button, Category, Brand } from "../components/componentIndex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
import Style from "@/styles/NFTDetails.module.css";
const NFTDetails = () => {
  return (
    <div>
      <NFTDetailsPage />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
