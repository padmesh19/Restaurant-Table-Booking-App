/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";

import { HeaderContainer } from "./elements";
import CloseIcon from "../../../../../../assets/icons/close-modal.svg";

// const DELAY = 500;

export const Header = ({ hotel }) => {
  const history = useNavigate();
  const onButtonCancel = () => {
    history(`/customer`, { replace: true });
  };
  const { hotelId } = useParams();
  const onButtonViewComments = () => {
    history(`/customer/${hotelId}/view-comments`);
  };
  const onButtonOffersMenu = () => {
    history(`/customer/${hotelId}/menu-offer`);
  };
  return (
    <HeaderContainer>
      <div className="header-container fixed-top">
        <div className="header">
          <div className="title">
            {hotel?.hotel_name}
            <p className="owner">{`Owner : ${hotel?.first_name} ${hotel?.last_name}`}</p>
          </div>
          <div className="header-left">
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              className="view-offers-button"
              onClick={onButtonOffersMenu}
              type="button"
              id="view-offers-button"
            >
              Menu And Offers
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              className="view-comments-button"
              onClick={onButtonViewComments}
              type="button"
              id="view-comments-button"
            >
              View Comments
            </motion.button>
            <button
              className="btn"
              onClick={onButtonCancel}
              type="button"
              id="close-button"
            >
              <img alt="Options" src={CloseIcon} />
            </button>
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
};
