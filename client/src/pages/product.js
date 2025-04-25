// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import { getProduct } from '../utils/fetch.js';
import styles from './styles/product.js';

import '../components/product-item.js';

export class Product extends LitElement {
  static get properties() {
    return {
      productId: { type: Number },
      updateParent: { type: Function },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.state = {
      status: 'loading',
      productItem: {},
    };

    // Initial value for updateParent
    // Trigger parent components update lifecycle
    this.updateParent = () => {};
  }

  async updated() {
    const prevItem = this.state.productItem;
    let productItem;

    // Fetch the product
    if (this.productId) {
      productItem = await getProduct(this.productId);

      this.state = {
        ...this.state,
        status: 'loaded',
        productItem,
      };

      // If there was an error, make sure this is captured.
      if (productItem?.apiError) {
        this.state.apiError = productItem.apiError;
        this.requestUpdate(); // BUG(glasnt): with this, the page API loops. Without, it doesn't update at all.
      }
      // Only update if the previously loaded product
      // is different than the requested product
      if (prevItem?.id !== this.productId) {
        this.requestUpdate();
      }
    }
  }

  render() {
    const { status, productItem, apiError } = this.state;

    if (apiError) {
      return html`<app-error .apiError=${apiError}></app-error>`;
    }

    return html`
      <div class="productBase">
        ${status === 'loading'
          ? html`<p>loading...</p>`
          : html`<app-product-item
              .productId="{this.productId}"
              .productItem=${productItem}
              .updateParent=${this.updateParent}
            ></app-product-item>`}
      </div>
    `;
  }
}

customElements.define('app-product', Product);
