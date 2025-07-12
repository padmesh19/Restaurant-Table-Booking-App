import styled from "styled-components";

export const CardContainer = styled.div`
  overflow: hidden;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  cursor: pointer;
  background-color: #ffffff;
  transition: transform 200ms ease-in;
  box-shadow: 0px 0px 2px 0px #9559c1;
  padding: 0.75rem;
  .card__body {
    overflow-wrap: anywhere;
    word-break: break-all;
    margin-right: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .card__title {
    color: #3d4457;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: unset;
  }

  .card_btn_edit {
    padding: 0.15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    background: #9559c1;
    border-radius: 0.35rem;
  }
  .card_btn_edit:hover {
    border: 2px solid transparent;
    background: #2f3645;
  }
  .badge {
    background: #e0b3ff;
    color: #fff;
    text-align: center;
    height: 1.375rem;
    display: flex;
    align-items: center;
    border-radius: 1.25rem;
    span {
      font-size: 0.75rem;
      color: #0a0a0a;
      text-transform: capitalize;
      font-weight: 500;
    }
  }
  .card_btn_delete {
    padding: 0.15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ef4444;
    background: transparent;
    border-radius: 0.35rem;
    transition: background 200ms ease-in, color 200ms ease-in;
  }
`;
