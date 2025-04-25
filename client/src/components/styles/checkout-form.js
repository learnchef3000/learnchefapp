// Copyright 2025 LearnChef3000

import { css } from 'lit';

const styles = css`
  mwc-button {
    --mdc-theme-primary: darkgray;
  }

  .checkoutButton {
    margin-top: 10px;
    padding: 10px;
    color: gray;
    border-radius: 2px;
    border: none;
    cursor: pointer;
    font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
    text-transform: uppercase;
    font-size: 14px;
    background-color: var(--color-action);
    color: var(--color-action-text);
  }

  .checkoutButton:disabled {
    background-color: lightgray;
    color: darkgray;
    border-color: lightgray;
  }
`;

export default styles;
