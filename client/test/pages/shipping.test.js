// Copyright 2025 LearnChef3000

import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../../src/pages/shipping.js';

describe('Shipping', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<app-shipping></app-shipping>`);
  });

  it('renders main text element', () => {
    const shippingElement = element.shadowRoot.querySelector(
      '.shippingContainer > .shippingWrapper',
    );
    expect(shippingElement).to.exist;
    expect(shippingElement.textContent).to.equal(
      '\n          This website ships no products, but this website was shipped through\n          Google Cloud automation.\n          Learn more.\n        ',
    );
  });
});
