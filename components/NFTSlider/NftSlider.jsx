import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";

import Style from "@/components/NFTSlider/NftSlider.module.css";
import images from "../../img";
import { Button } from "../componentIndex";

const NftSlider = () => {
  const [idNumber, setIdNumber] = useState(1);
  const sliderData = [
    {
      title: "Hello NFT",
      id: 1,
      name: "Sevval Tuncay",
      collection: "Gym",
      price: "00000052 ETH",
      like: 488,
      image: images.user1,
      nftImage: images.nft_image_2,
      time: {
        days: 27,
        hours: 10,
        minutes: 12,
        seconds: 13,
      },
    },
    {
      title: "Buddy NFT",
      id: 2,
      name: "Mike Khai",
      collection: "Home",
      price: "00000054 ETH",
      like: 215,
      image: images.user1,
      nftImage: images.nft_image_1,
      time: {
        days: 23,
        hours: 11,
        minutes: 15,
        seconds: 17,
      },
    },
    {
      title: "Gym NFT",
      id: 3,
      name: "Sophie Wood",
      collection: "Gym",
      price: "00000023 ETH",
      like: 156,
      image: images.user3,
      nftImage: images.nft_image_3,
      time: {
        days: 27,
        hours: 10,
        minutes: 12,
        seconds: 13,
      },
    },
    {
      title: "Home NFT",
      id: 4,
      name: "Sasha Murad",
      collection: "Home",
      price: "00000052 ETH",
      like: 488,
      image: images.user4,
      nftImage: images.nft_image_1,
      time: {
        days: 27,
        hours: 10,
        minutes: 12,
        seconds: 13,
      },
    },
  ];
  //Inc dinamik hal için
  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData.length]);
  //dec
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);
  return (
    <div className={Style.NftSlider}>
      <div className={Style.NftSlider_box}>
        <div className={Style.NftSlider_box_left}>
          <h2>{sliderData[idNumber].title}</h2>
          <div className={Style.NftSlider_box_left_creator}>
            <div className={Style.NftSlider_box_left_creator_profile}>
              <Image
                className={Style.NftSlider_box_left_creator_profile_img}
                src={sliderData[idNumber].image}
                alt="profile image"
                width={50}
                height={50}
              />
              <div className={Style.NftSlider_box_left_creator_profile_info}>
                <p>Creator</p>
                <h4>
                  {sliderData[idNumber].name}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>

            <div className={Style.NftSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.NftSlider_box_left_creator_collection_icon}
              />

              <div className={Style.NftSlider_box_left_creator_collection_info}>
                <p>Collection</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className={Style.NftSlider_box_left_bidding}>
            <div className={Style.NftSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p>
                {sliderData[idNumber].price} <span>$221,21</span>
              </p>
            </div>

            <p className={Style.NftSlider_box_left_bidding_box_auction}>
              <MdTimer className={Style.NftSlider_box_left_bidding_box_icon} />
              <span>Auction ending in</span>
            </p>

            <div className={Style.NftSlider_box_left_bidding_box_timer}>
              <div className={Style.NftSlider_box_left_bidding_box_timer_item}>
                <p>{sliderData[idNumber].time.days}</p>
                <span>Days</span>
              </div>

              <div className={Style.NftSlider_box_left_bidding_box_timer_item}>
                <p>{sliderData[idNumber].time.hours}</p>
                <span>Hours</span>
              </div>

              <div className={Style.NftSlider_box_left_bidding_box_timer_item}>
                <p>{sliderData[idNumber].time.minutes}</p>
                <span>mins</span>
              </div>

              <div className={Style.NftSlider_box_left_bidding_box_timer_item}>
                <p>{sliderData[idNumber].time.seconds}</p>
                <span>secs</span>
              </div>
            </div>

            <div className={Style.NftSlider_box_left_button}>
              <Button btnName="Place" handleClick={() => {}} />
              <Button btnName="View" handleClick={() => {}} />
            </div>
          </div>

          <div className={Style.NftSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLines
              className={Style.NftSlider_box_left_sliderBtn_icon}
              onClick={() => dec()}
            />
            <TbArrowBigRightLine
              className={Style.NftSlider_box_left_sliderBtn_icon}
              onClick={() => inc()}
            />
          </div>
        </div>

        <div className={Style.NftSlider_box_right}>
          <div className={Style.NftSlider_box_right_box}>
            <Image
              src={sliderData[idNumber].nftImage}
              alt="NFT IMAGE"
              className={Style.NftSlider_box_right_box_img}
              width={800}
              height={800}
            />

            <div className={Style.NftSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NftSlider;
