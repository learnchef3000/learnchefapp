// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import styles from './styles/shipping.js';

export class Shipping extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div class="shippingContainer">
        <h1>Shipping</h1>
        <div class="shippingWrapper">
          This website ships no products, but this website was shipped through
          Google Cloud automation.
          <a
            href="https://github.com/GoogleCloudPlatform/learnchef/tree/main/docs"
            >Learn more.</a
          >
        </div>
      </div>
    `;
  }
}

customElements.define('app-shipping', Shipping);
