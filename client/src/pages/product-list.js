// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import { navigator } from '../vendor/lit-element-router-2.0.3a/lit-element-router.js';
import { getProductList } from '../utils/fetch.js';
import styles from './styles/product.js';

const noimage = new URL('../../assets/noimage.png', import.meta.url).href;

export class ProductList extends navigator(LitElement) {
  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.title = 'Product List';
    this.state = {
      status: 'loading',
      products: [],
    };
  }

  async firstUpdated(changed) {
    super.firstUpdated(changed);

    let products = await getProductList();

    this.state = {
      status: 'loaded',
      products,
    };

    if (this.state.status === 'loaded') {
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="productContainer">
        <h1 class="productTitle">Product List</h1>
        <div class="productWrapper">
          ${this.state.status === 'loading'
            ? html`<p>loading...</p>`
            : this.state.products.length == 0
            ? html`<p>No products found.</p>`
            : this.state.products.map(
                item => html`
                  <div
                    class="productItem"
                    @click=${() =>
                      item.id && this.navigate(`/products/${item.id}`)}
                  >
                    <div class="productimageWrapper">
                      <img
                        class="productimage"
                        alt="Product Image"
                        src=${item.image}
                        loading="lazy"
                        onerror=${`this.src='${noimage}';`}
                      />
                    </div>
                    <div class="productItemContent">
                      <div class="itemTitle">${item.name}</div>
                      <div>${`Price: $${item.discount_price}`}</div>
                      <div>
                        ${item.inventory_count
                          ? `Available: ${item.inventory_count}`
                          : `Sold Out!`}
                      </div>
                    </div>
                  </div>
                `,
              )}
        </div>
      </div>
    `;
  }
}

customElements.define('app-product-list', ProductList);
