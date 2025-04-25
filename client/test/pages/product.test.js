// Copyright 2025 LearnChef3000

import { html } from 'lit';
import { waitUntil, fixture, expect } from '@open-wc/testing';

import '../../src/pages/product.js';

describe('Product', () => {
  it('renders loading element', async () => {
    const element = await fixture(html`<app-product></app-product>`);
    const contentElem = element.shadowRoot.querySelector('.productBase > p');
    const productItemElem =
      element.shadowRoot.querySelector('app-product-item');

    expect(productItemElem).to.not.exist;
    expect(contentElem).to.exist;
    expect(contentElem.textContent).to.equal('loading...');
  });

  it('renders product item element properly', async () => {
    const mockState = { status: 'loaded', productItem: { name: 'hello' } };
    const loadedElem = await fixture(
      html`<app-product .state=${mockState}></app-product>`,
    );

    await waitUntil(() => loadedElem.state, 'Element did not become ready');

    const base = loadedElem.shadowRoot.querySelector('app-product-item');
    expect(base).to.exist;
  });
});
