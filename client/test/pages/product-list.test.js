// Copyright 2025 LearnChef3000

import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../../src/pages/product-list.js';

describe('ProductList', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<app-product-list></app-product-list>`);
  });

  it('renders title element', () => {
    const titleElement = element.shadowRoot.querySelector(
      '.productContainer > h1',
    );

    expect(titleElement).to.exist;
    expect(titleElement.textContent).to.equal('Product List');
  });
});
