// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import { router } from './vendor/lit-element-router-2.0.3a/lit-element-router.js';
import { getSiteConfig } from './utils/fetch.js';
import routes from './utils/routes.js';
import styles from './styles/shell.js';

// Pages
import './pages/home.js';
import './pages/topic-list.js';
import './pages/topic-detail.js';
import './pages/test.js';
import './pages/not-found.js';
import './pages/error.js';

// Layout components
import './components/header.js';
import './components/footer.js';
import './components/main.js';

export class LearnChefShell extends router(LitElement) {
  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
    };
  }

  static get routes() {
    return routes;
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.state = {
      config: {},
      loading: true,
      apiError: null,
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    const config = await getSiteConfig();

    if (config) {
      if (config.errors) {
        this.state.apiError = config.errors;
      }
      this.state.loading = false;
    }
    if (config?.apiError) {
      this.state.apiError = config.apiError;
    }

    this.state.config = config || {};

    // Apply theme CSS variables
    if (config) {
      this.style.setProperty('--color-primary', config.color_primary);
      this.style.setProperty('--color-secondary', config.color_secondary);
      this.style.setProperty('--color-action', config.color_action);
      this.style.setProperty('--color-action-text', config.color_action_text);
      this.style.setProperty('--site-name-color', config.site_name_color);
      this.style.setProperty('--site-name-font', config.site_name_font);
      this.style.setProperty('--base-font', config.base_font);

      if (window.WebFont && config.base_font) {
        window.WebFont.load({
          google: {
            families: [config.base_font, config.site_name_font],
          },
        });
      }
    }

    this.requestUpdate();
  }

  router(route, params) {
    this.route = route;
    this.params = params;
  }

  render() {
    const { config, loading, apiError } = this.state;

    if (apiError) {
      return html`<app-error .apiError=${apiError}></app-error>`;
    }

    return loading
      ? html`<app-loading></app-loading>`
      : html`
          <app-header .headerTitle=${config.site_name}></app-header>
          <app-main active-route=${this.route}>
            <div class="route" route="home">
              <app-home></app-home>
            </div>
            <div class="route" route="topics">
              <app-topic-list></app-topic-list>
            </div>
            <div class="route" route="topic-detail">
              <app-topic-detail
                .topicId=${parseInt(this.params.id, 10)}
              ></app-topic-detail>
            </div>
            <div class="route" route="test">
              <app-test .testId=${parseInt(this.params.id, 10)}></app-test>
            </div>
            <div class="route" route="not-found">
              <app-not-found></app-not-found>
            </div>
          </app-main>
          <app-footer></app-footer>
        `;
  }
}

customElements.define('learnchef-shell', LearnChefShell);
