/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router";

import { HeaderContainer } from "./elements";
import CloseIcon from "../../../../../../assets/icons/close-modal.svg";

// const DELAY = 500;

export const Header = ({ hotel }) => {
  const navigate = useNavigate();
  const onButtonCancel = () => {
    navigate(-1);
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
