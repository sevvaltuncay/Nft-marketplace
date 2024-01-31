import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";

import Style from "./HeroSection.module.css";
import { Button } from "../componentIndex";
import images from "../../img";

import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>{titleData}🖼️</h1>
          <p>
            Discover the most outstanding NFTs in all topics of life. Creative
            your NFTs and sell them
          </p>
          <Button btnName="Start your search" />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero5}
            alt="Hero section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
