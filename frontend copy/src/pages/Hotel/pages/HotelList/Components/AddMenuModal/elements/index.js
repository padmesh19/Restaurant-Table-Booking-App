import styled from "styled-components";

import { Modal } from "../../../../../../../components/common";

export const AddMenuContainer = styled(Modal)`
  background-color: #fff;
  border-radius: 0.5rem;
  .classheading {
    display: flex;
    flex-direction: column;

    .main-text {
      color: #3d4457;
      font-weight: 500;
      font-size: 1.5rem;
    }

    .sub-text {
      font-size: 0.875rem;
      color: #8a8c94;
    }
  }
  .save-changes {
    border: 0.0625rem solid #0a0a0a;
    background: #0a0a0a;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.375rem;
    img {
      vertical-align: middle;
      // margin-right: 0.5rem;
    }
    .add-button-text {
      color: #ffffff;
      font-style: normal;
      font-weight: 500;
      font-size: 0.875rem;
    }
  }
  .added-items-container {
    padding: 0.25rem 1.5rem;
    max-height: 5rem;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    .tags {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 8px;
      border: 1px dashed #9559c1;
      font-size: 14px;
      p {
        margin-bottom: unset !important;
        padding: 0rem 0.5rem;
      }
      .food-name {
        font-weight: 500;
      }
      // .sperator {
      //   height: 1px;
      //   width: 2px;
      //   background-color: #9559c1;
      // }
      .type {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        padding: 0 0.25rem;
        background-color: #fedde4;
      }
    }
    flex p {
      margin-bottom: unset !important;
    }
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 2px grey;
      border-radius: 5px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: black;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #000000a1;
    }
  }
  .text {
    padding: 0 1rem;
    margin-bottom: 0.5rem;
    color: #3d4457;
    font-size: 1rem;
  }
  .closeIconBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: unset !important;
    border: none;
    background: transparent;
    outline: none;
    img {
      vertical-align: middle;
    }
  }

  .row-container-last {
    width: 50%;
    display: flex;
    flex-direction: row;

    .field-left,
    .field-right {
      width: 100%;
      margin-right: 0.5rem;
    }

    @media (max-width: 50rem) {
      & {
        width: 100%;
      }

      .field-left {
        margin-right: 1rem;
      }

      .field-right {
        margin-right: unset;
        margin-top: unset;
      }
    }

    @media (max-width: 33rem) {
      & {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      .field-left {
        margin-right: unset;
      }

      .field-right {
        margin-top: 1rem;
      }
    }
  }
  .form-container {
    margin: 0 1.5rem 0.5rem 1.5rem;
  }
  .row-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    .course-name {
      width: 100%;
      margin-bottom: 1.5rem;
    }

    .field-left,
    .field-right {
      width: 100%;
    }
    .field-right {
      margin-top: 1.5rem;
    }

    .field-left {
      margin-bottom: 1rem;
      margin-right: 0.5rem;
    }

    @media (max-width: 50rem) {
      & {
        display: flex;
        flex-direction: column;
      }

      .field-left {
        margin-bottom: 1rem;
      }

      .field-left1 {
        margin-right: unset;
      }

      .field-right {
        margin-top: 0.5rem !important;
      }
      .course-name {
        margin-bottom: 0.75rem;
      }
    }
  }
  .add-items-count {
    padding: 0rem 0rem 0.5rem 1.5rem;
    font-weight: 500;
    font-size: 16px;
  }
`;
