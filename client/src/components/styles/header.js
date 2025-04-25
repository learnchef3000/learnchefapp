// Copyright 2025 LearnChef3000

import { css } from 'lit';

const styles = css`
  :host {
    font-family: var(--base-font), sans-serif;
    width: 100%;
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 2em;
    background-color: var(--color-primary);
    background-image: linear-gradient(to right, white, var(--color-primary));
  }

  h1 {
    font-family: var(--site-name-font), cursive;
    font-size: 45px;
  }

  h1 > a {
    color: var(--site-name-color) !important;
  }

  .header > h1 > a {
    text-decoration: none;
  }

  .header > h1 > a:active {
    text-decoration: underline;
  }

  .navigationBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
  }

  .navigationPanel {
    display: flex;
  }

  .shoppingCartIcon {
    width: auto;
    height: 30px;
  }

  .shoppingCartTotal {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    background: floralwhite;
    position: relative;
    bottom: 23px;
    left: 18px;
    border: 2px solid black;
    border-radius: 20px;
    text-align: center;
    height: 22px;
    width: 22px;
  }
`;

export default styles;
