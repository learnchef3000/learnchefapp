// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import { getTopic, uploadTopicPDF, createTopic } from '../utils/fetch.js';

export class TopicDetail extends LitElement {
  static properties = { topicId: {}, topic: { state: true } };
  constructor() {
    super();
    this.topic = null;
  }
  async connectedCallback() {
    super.connectedCallback();
    if (this.topicId === 'new') return;
    const data = await getTopic(this.topicId);
    if (!data.apiError) this.topic = data;
  }
  async _onFileChange(e) {
    const file = e.target.files[0];
    if (file && this.topic) {
      await uploadTopicPDF(this.topic.id, file);
      this.topic = await getTopic(this.topic.id);
    }
  }
  render() {
    if (this.topicId === 'new') {
      // You’d build a form to POST createTopic(name, date)
      return html`<h2>Create New Topic</h2>
        <!-- form omitted for brevity -->`;
    }
    if (!this.topic) return html`<p>Loading…</p>`;
    return html`
      <h2>${this.topic.name}</h2>
      <p>Exam Date: ${this.topic.exam_date}</p>
      <p>
        PDF:
        ${this.topic.pdf_file
          ? html`<a href="${this.topic.pdf_file}">Download</a>`
          : html`<input type="file" @change=${this._onFileChange} />`}
      </p>
      <h3>Available Tests</h3>
      <ul>
        ${this.topic.tests.map(
          test => html`<li><a href="#/tests/${test.id}">Test ${test.id}</a></li>`
        )}
      </ul>
    `;
  }
}
customElements.define('app-topic-detail', TopicDetail);
