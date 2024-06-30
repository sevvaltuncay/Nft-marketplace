import React, { useState, useContext, useEffect } from "react";
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";
import { useRouter } from "next/router";

import { Button, Category, Brand } from "../components/componentIndex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
import Style from "@/styles/NFTDetails.module.css";
const NFTDetails = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);
  return (
    <div>
      <NFTDetailsPage nft={nft} />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
