// Copyright 2025 LearnChef3000

import { css } from 'lit';

const styles = css`
  mwc-button {
    --mdc-theme-primary: darkgray;
  }

  h1.checkoutTitle {
    color: var(--color-secondary);
  }

  .checkoutContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: 20px;
  }

  .checkoutWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .cartTotalWrapper {
    padding: 10px;
  }

  .checkoutPanel {
    display: flex;
    flex-direction: column;
    border: 1px solid green;
    border-radius: 5px;
    padding: 20px;
    margin: 10px;
    width: 100%;
    max-height: 350px;
    overflow-y: scroll;
  }
`;

export default styles;
