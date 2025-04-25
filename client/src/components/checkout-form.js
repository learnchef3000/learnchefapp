// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import styles from './styles/checkout-form.js';

class CheckoutForm extends LitElement {
  static properties() {
    return {
      onSubmit: { type: Function },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.state = {
      disableSubmit: true,
      openFormErrorDialog: false,
    };

    // Bind "this" component to functions
    this.onSubmit = () => {};
    this.submitForm = this.submitForm.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }

  firstUpdated() {
    // Add input change callback for email input
    const email = this.shadowRoot.getElementById('email');
    email.addEventListener('change', this.onEmailChange);
  }

  onEmailChange() {
    const form = new FormData(this.shadowRoot.querySelector('form') || {});
    const isValid = this.isValidEmail(form.get('email'));

    // Disable submit while form is being sent
    this.state.disableSubmit = !isValid;
    this.requestUpdate();
  }

  isValidEmail(text) {
    return /[^ @]*@[^ @]*/.test(text);
  }

  async submitForm(event) {
    event?.preventDefault();

    // Disable submit while form is being sent
    this.state.disableSubmit = true;
    this.requestUpdate();

    const form = new FormData(this.shadowRoot.querySelector('form') || {});

    await this.onSubmit(form);
    // Waiting till callstack is empty to re-enable submit button
    setTimeout(() => {
      this.state.disableSubmit = false;
      this.requestUpdate();
    }, 0);
  }

  render() {
    const { disableSubmit } = this.state;

    return html` <div>
      <form @submit=${this.submitForm}>
        <div class="formControls">
          <mwc-textfield
            outlined
            required
            autoValidate
            id="email"
            name="email"
            label="Enter your email"
            helper="foo@bar.com"
            pattern="[^ @]*@[^ @]*"
            placeholder="Enter your email"
            validationMessage="Requires email format."
          ></mwc-textfield>
          <mwc-select
            name="type"
            label="Payment Type"
            required
            validationMessage="Field is required"
          >
            <mwc-list-item selected value="collect">Collect</mwc-list-item>
            <mwc-list-item value="credit">Credit</mwc-list-item>
          </mwc-select>
          ${disableSubmit
            ? html`<button disabled type="submit" class="checkoutButton">
                Purchase
              </button>`
            : html`<button type="submit" class="checkoutButton">
                Purchase
              </button>`}
        </div>
      </form>
    </div>`;
  }
}

customElements.define('app-checkout-form', CheckoutForm);
