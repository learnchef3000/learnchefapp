// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import styles from './styles/checkout-dialog.js';

class CheckoutDialog extends LitElement {
  static properties() {
    return {
      onClose: { type: Function },
      isSuccess: { type: Boolean },
      errors: { type: Array },
    };
  }

  static get styles() {
    return styles;
  }

  render() {
    const { isSuccess, onClose, errors } = this;

    return html`
      <mwc-dialog open>
        ${isSuccess
          ? html` <div class="dialogWrapper">
              <h2>Hooray! ⭐</h2>
              <div>We've successfully processed your purchase request.</div>
              <div>(This is just a sample.)</div>
            </div>`
          : html` <div class="dialogWrapper">
              <h2>Oh no! 😭</h2>
              <div>Unable to complete your checkout.</div>
              <div class="errors">
                <div>
                  ${errors?.map(
                    e => html`<div>${e?.message || JSON.stringify(e)}</div>`,
                  ) || ''}
                </div>
              </div>
            </div>`}
        <mwc-button
          label="Close"
          class="dialogButton"
          slot="primaryAction"
          @click="${onClose}"
        >
        </mwc-button>
      </mwc-dialog>
    `;
  }
}

customElements.define('app-checkout-dialog', CheckoutDialog);
