// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import styles from './styles/error.js';

const sadimage = new URL('../../assets/sad-learnchef.png', import.meta.url).href;

export class Error extends LitElement {
  static get properties() {
    return {
      apiError: { type: Object },
    };
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div class="errorContainer">
        <div class="errorLeft">
          <div class="errorImage"><img src=${sadimage} /></div>
        </div>
        <div class="errorDetails">
          <h1>Oh no-vocado!</h1>
          <div class="errorMessage">${this.apiError.message}</div>
          <div class="errorURL">
            <a href="${this.apiError.url}" target="_blank"
              >${this.apiError.url}</a
            >
          </div>
          <div class="errorError">${this.apiError.error}</div>
          <div class="errorError">${this.apiError.extra_error}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-error', Error);
