// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import styles from './styles/cart-item.js';

const noimage = new URL('../../assets/noimage.png', import.meta.url).href;

export class CartItem extends LitElement {
  static get properties() {
    return {
      productItem: { type: Object },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.state = {
      productItem: {},
    };
  }

  render() {
    const { name, discount_price, count, image } =
      this.productItem || {};

    return html`
      <div class="cartItem">
        <div class="cartImageWrapper">
          <img
            class="productimage"
            alt="Product Image"
            src=${image}
            style="height: 110px; width: auto;"
            loading="lazy"
            onerror=${`this.src='${noimage}';`}
          />
        </div>
        <div class="cartItemContent">
          <div class="itemTitle">${name}</div>
          <div>${`Price: $${discount_price}`}</div>
          <div>${`Count: ${count}`}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-cart-item', CartItem);
