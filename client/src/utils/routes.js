// Copyright 2025 LearnChef3000

const routes = [
  { name: 'home',          pattern: '' },
  { name: 'topics',        pattern: 'topics' },
  { name: 'topic-detail',  pattern: 'topics/:id' },
  { name: 'test',          pattern: 'tests/:id' },
  { name: 'not-found',     pattern: '*' },
];

export default routes;
