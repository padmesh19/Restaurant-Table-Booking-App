import styled, { css } from "styled-components";

export const InputElementContainer = styled.div`
  border: 0.0625rem solid ${({ theme }) => theme.colors.border};
  border-radius: 0.375rem;
  overflow: hidden;

  transition: border-color 0.1s, box-shadow 0.1s;

  &.has-error {
    border-color: ${({ theme }) => theme.colors.danger} !important;

    &.is-focused {
      box-shadow: 0 0 0 0.125rem ${({ theme }) => theme.colors.lightDanger};
    }
  }

  &.is-focused {
    box-shadow: 0px 0px 2px 0px #9559c1;
  }

  .text-input {
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.textDark};
    font-size: 0.875rem;
    line-height: 1.125rem;
    padding: 0.5rem 1rem;

    &.is-large {
      padding: 1.1875rem 1.5rem;
    }

    :active,
    :focus {
      outline: none;
    }

    ::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
    }
  }

  .toggle-visibility-button {
    background-color: transparent;
    border: none;
    right: 1.25rem;
    width: 1rem;
    padding: 0;

    :active,
    :focus {
      outline: none;
    }

    .visibility-icon {
      height: 100%;
    }
  }

  .status-icon {
    height: 1.25rem;
    right: 1.5rem;
    width: 1.25rem;

    &.spinner-icon {
      animation: spin 1s linear infinite;
    }
  }
`;

export const TextInputContainer = styled.div`
  ${({ maxWidth }) =>
    maxWidth
      ? css`
          max-width: ${maxWidth};
        `
      : ""};
  ${({ minWidth }) =>
    minWidth
      ? css`
          min-width: ${minWidth};
        `
      : ""};
  ${({ width }) =>
    width
      ? css`
          width: ${width} !important;
        `
      : ""};

  .label {
    color: #0a0a0a;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.05875rem;
  }

  .error-message {
    bottom: -1.1575rem;
    color: ${({ theme }) => theme.colors.danger};
    font-size: 0.75rem;
    left: 0;
    line-height: 0.9075rem;
  }
`;
