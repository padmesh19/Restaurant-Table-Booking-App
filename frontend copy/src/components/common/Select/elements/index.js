// elements.js
import styled, { css } from "styled-components";

export const SelectContainer = styled.div`
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
    `};

  ${({ width }) =>
    width &&
    css`
      width: ${width} !important;
    `};

  .label {
    color: #0a0a0a;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.05875rem;
  }

  .error-message {
    position: absolute;
    bottom: -1.1575rem;
    color: ${({ theme }) => theme.colors.danger};
    font-size: 0.75rem;
    line-height: 0.9075rem;
    left: 0;
  }

  .dropdown-indicator-icon {
    height: 1.25rem;
    width: 1.25rem;
    pointer-events: none;
  }

  .blue-tick-icon {
    height: 1rem;
    width: 1rem;
  }

  .select-icon {
    height: 1.5rem;
    width: 1.5rem;
  }

  .selected-value {
    color: ${({ theme }) => theme.colors.textDark};
  }

  .option-content {
    color: ${({ theme }) => theme.colors.textDark};
    &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
    }
  }

  .select-box {
    border-radius: 0.25rem;
    &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
    }
  }

  .is-truncated {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // Optional: If you want the container to indicate focus/error externally
  .react-select__control {
    transition: border-color 0.1s, box-shadow 0.1s;
  }

  .react-select__control--is-focused {
    box-shadow: 0px 0px 2px 0px #9559c1;
  }

  .react-select__control--is-focused.has-error {
    border-color: ${({ theme }) => theme.colors.danger};
    box-shadow: 0 0 0 0.125rem ${({ theme }) => theme.colors.lightDanger};
  }
`;
