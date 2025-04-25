// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import { getActiveProduct } from '../utils/fetch.js';
import cache from '../utils/cache.js';
import styles from './styles/home.js';
import '../components/product-item.js';

export class Home extends LitElement {
  constructor() {
    super();
    this.title = 'Home';
    this.state = {
      status: 'loading',
      productItem: {},
    };
  }

  static get styles() {
    return styles;
  }

  async disconnectedCallback() {
    super.disconnectedCallback();
    cache.deleteDB();
  }

  async firstUpdated() {
    const productItem = await getActiveProduct();

    this.state = {
      ...this.state,
      status: 'loaded',
      productItem,
    };

    if (productItem?.apiError) {
      this.state.apiError = productItem.apiError;
    }

    this.requestUpdate();
  }

  render() {
    const { status, productItem, apiError } = this.state;

    if (apiError) {
      return html`<div class="homeBase">
        <p>No active product found. Check <a href="/products">Products</a>.</p>
      </div>`;
    }

    return html`
      <div class="homeBase">
        ${status === 'loading'
          ? html`<p class="loading">loading... 🥑</p>`
          : html`<app-product-item
              .productId="{this.productId}"
              .productItem=${productItem}
            ></app-product-item>`}
      </div>
    `;
  }
}

customElements.define('app-home', Home);
