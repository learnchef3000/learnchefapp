// Copyright 2025 LearnChef3000

import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../../src/pages/home.js';

describe('Home', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<app-home></app-home>`);
  });

  it('renders loading element', () => {
    const loadingElement = element.shadowRoot.querySelector('.homeBase > p');

    expect(loadingElement).to.exist;
    expect(loadingElement.textContent).to.equal('loading... 🥑');
  });
});
