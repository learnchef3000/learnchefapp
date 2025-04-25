// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import styles from './styles/footer.js';
import { getConfig } from '../utils/config.js';
import './link.js';

export class Footer extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    const { VERSION, LEARNCHEF_PURCHASE_MODE } = getConfig();

    return html`
      <div class="footer">
        <div class="footerWrapper">
          Made with 💚 from the
          <a href="https://github.com/GoogleCloudPlatform/avocano/">Pit Crew</a>
        </div>
        <div class="version">
          Avocano v${VERSION} (purchase mode: ${AVOCANLEARNCHEFASE_MODE})
        </div>
      </div>
    `;
  }
}

customElements.define('app-footer', Footer);
