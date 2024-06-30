import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { NFTMarketplaceTarget, NFTMarketplaceABI } from "./constants";

require("dotenv").config();
const ID = process.env.PROJECT_ID;
const secret = process.env.PROJECT_SECRET;
const auth = `Basic${Buffer.from(`${ID}:${secret}`).toString("base64")}`;

const subDomain = "https://ipfs.infura.io:5001/api/v0";
//const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

//fetch contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceTarget,
    NFTMarketplaceABI,
    signerOrProvider
  );
//akıllı sözleşmeye bağlama
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something gone wrong while connecting with contract!");
  }
};

export const NFTMarketplaceContext = React.createContext();
export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect and sell NFTs";
  const [currentAccount, setCurrentAccount] = useState("");
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account Found");
      }
    } catch (error) {
      console.log("Something went wrong while connecting the wallet!");
    }
  };
  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      console.log("Error while connecting to wallet");
    }
  };
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Error uploaidng to IPFS", error);
    }
  };
  const createNFT = async (name, price, description, image, router) => {
    if (!name || !description || !price || !image)
      return console.log("Data is missing");
    const data = JSON.stringify({ name, description, image });
    try {
      const added = await client.add(data);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      await createSale(url, price);
    } catch (error) {
      console.log(error);
    }
    // } catch (error) {
    //   console.log("Error while creating NFT");
    // }
  };
  //createSale
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.reSellToken(url, price, {
            value: listingPrice.toString(),
          });
      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log("error while creating sale");
    }
  };
  //fetch NFTS
  const fetchNFTS = async () => {
    try {
      const provider = new ethers.provideRS.JsonRpcProvider();
      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItem();
      // console.log(data)
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("error while the fetch!");
    }
  };
  const fetchMyNFTorListedNFTS = async (type) => {
    try {
      const contract = await connectingWithSmartContract();
      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFT();
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.util.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error while fetching listed NFT!");
    }
  };
  //buy function
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await transaction.wait();
    } catch (error) {
      console.log("error while buying NFT");
    }
  };
  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        titleData,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFTS,
        fetchMyNFTorListedNFTS,
        buyNFT,
        currentAccount,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
