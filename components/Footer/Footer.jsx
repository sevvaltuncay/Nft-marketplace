import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiSocialYoutubeCircular,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image
            src={images.logo2}
            alt="footer logo"
            height={100}
            width={100}
          />
          <h1> Stargazer's Hall</h1>
          <p>
            The world's first and largest digital marketplace for everyone. They
            can buy NFTs, sell and collecting.
          </p>
          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
          </div>
        </div>
        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>
        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>
        <div className={Style.subscribe}>
          <h3>Subscribe</h3>
          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email * " />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              Digital marketplace for crypto collectibles and non-fungible
              tokens (NFTs). Buy, sell, and discover exclusive digital items.
            </p>
          </div>
        </div>
      </div>
      <div className={Style.footer_end}>
        <p>Copright © 2024 Stargazer's Hall. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
