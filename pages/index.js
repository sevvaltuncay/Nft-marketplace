import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/index.module.css";

import {
  HeroSection,
  Service,
  NftSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  LikeProfile,
  FollowerTab,
  Slider,
  Brand,
  Video,
} from "@/components/componentIndex";
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected } = useContext(NFTMarketplaceContext);
  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <NftSlider />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      <FollowerTab />
      <Slider />
      <Title
        heading={"New Collection"}
        paragraph={"Discover the NFTs about all the topics"}
      />
      <Collection />
      <Title
        heading={"Featured by NFTs"}
        paragraph={"Discover the NFTs about all the topics"}
      />
      <Filter />
      <NFTCard />
      <Title heading="Browse by category" paragraph="Explore the NFTs" />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
