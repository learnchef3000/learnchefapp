// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import { getTopics } from '../utils/fetch.js';

export class TopicList extends LitElement {
  static properties = { topics: { state: true } };
  constructor() { super(); this.topics = []; }
  async connectedCallback() {
    super.connectedCallback();
    const data = await getTopics();
    if (!data.apiError) this.topics = data;
  }
  render() {
    return html`
      <h2>All Topics</h2>
      <ul>
        ${this.topics.map(
          t => html`<li>
            <a href="#/topics/${t.id}">${t.name} — Exam: ${t.exam_date}</a>
          </li>`
        )}
      </ul>
      <button @click=${() => (location.hash = '#/topics/new')}>
        + New Topic
      </button>
    `;
  }
}
customElements.define('app-topic-list', TopicList);
