// Copyright 2025 LearnChef3000

import { css } from 'lit';

const styles = css`
  .itemTitle {
    color: var(--color-secondary);
  }

  .cartItem {
    display: flex;
    align-item: flex-start;
    justify-content: space-around;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
    background: white;
  }

  .cartItemContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px;
  }

  .cartItemWrapper {
    display: flex;
    flex-direction: row;
  }

  .cartImageWrapper {
    display: flex;
    margin: 15px 10px;
  }

  .cartItemContent {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default styles;
