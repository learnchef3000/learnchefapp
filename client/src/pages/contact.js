// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import styles from './styles/contact.js';

export class Contact extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div class="contactContainer">
        <h1>Contact</h1>
        <div class="contactWrapper">
          This website was deployed from sample code in the
          <a href="https://github.com/GoogleCloudPlatform/learnchef"
            >GoogleCloudPlatform/learnchef</a
          >
          repo on GitHub.
        </div>
      </div>
    `;
  }
}

customElements.define('app-contact', Contact);
