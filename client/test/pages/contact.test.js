// Copyright 2025 LearnChef3000

import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../../src/pages/contact.js';

describe('Contact', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<app-contact></app-contact>`);
  });

  it('renders main text element', () => {
    const contactElement = element.shadowRoot.querySelector(
      '.contactContainer > .contactWrapper',
    );
    expect(contactElement).to.exist;
    expect(contactElement.textContent).to.equal(
      '\n          This website was deployed from sample code in the\n          GoogleCloudPlatform/learnchef\n          repo on GitHub.\n        ',
    );
  });
});
