// Copyright 2025 LearnChef3000

import { LitElement, html } from 'lit';
import { getTest } from '../utils/fetch.js';

export class AppTest extends LitElement {
  static properties = {
    testId: {},
    testData: { state: true },
    current: { state: true },
    answers: { state: true }
  };
  constructor() {
    super();
    this.testData = null;
    this.current = 0;
    this.answers = [];
  }
  async connectedCallback() {
    super.connectedCallback();
    const data = await getTest(this.testId);
    if (!data.apiError) this.testData = data;
  }
  _selectAnswer(answer) {
    this.answers[this.current] = answer.id;
    if (this.current < this.testData.questions.length - 1) {
      this.current++;
    } else {
      // Here you could POST results to server for adaptive logic
      alert('Test complete!');
    }
  }
  render() {
    if (!this.testData) return html`<p>Loading test…</p>`;
    const q = this.testData.questions[this.current];
    return html`
      <h2>Test ${this.testId}</h2>
      <p>Question ${this.current + 1}: ${q.text}</p>
      <ul>
        ${q.answers.map(
          a => html`<li><button @click=${() => this._selectAnswer(a)}>
            ${a.text}
          </button></li>`
        )}
      </ul>
    `;
  }
}
customElements.define('app-test', AppTest);
