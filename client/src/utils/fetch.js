// Copyright 2025 LearnChef3000

import { getConfig } from '../utils/config.js';
import { getDjangoError } from '../helpers/fetch.js';

const baseRequest = {
  credentials: 'include',
};

const _getAPI = async uri => {
  const { API_URL } = getConfig();
  const url = `${API_URL}/${uri}`;
  let apiError = { url };
  let response, data;

  try {
    response = await fetch(url, { method: 'GET', ...baseRequest });
    data = await response.clone().json();
  } catch (error) {
    console.error(error);
    apiError.error = error.toString();

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      apiError.message = `The API didn't respond. Is the API server up?`;
    } else if (
      error instanceof SyntaxError &&
      error.message.includes('is not valid JSON')
    ) {
      apiError.message = `The server returned invalid JSON. Is Django returning an error?`;
      apiError.error = `Error: "${response.statusText}"`;
      apiError.extra_error = getDjangoError(await response.text());
    } else {
      apiError.message = `Request encountered an error: ${error.name}`;
    }
    return { apiError };
  }

  if (!response.ok) {
    apiError.message = await response.text();
    apiError.error = `Server returned ${response.status} - ${response.statusText}`;
    return { apiError };
  }

  return data;
};

// SITE CONFIG

export const getSiteConfig = async () => {
  return _getAPI('active/site_config');
};

// TOPICS

export const getTopics = async () => {
  return _getAPI('topics/');
};

export const getTopic = async topicId => {
  return _getAPI(`topics/${topicId}/`);
};

export const createTopic = async (name, examDate) => {
  const { csrfToken, apiError } = await _getAPI('csrf_token');
  if (apiError) return { apiError };

  const { API_URL } = getConfig();
  const res = await fetch(`${API_URL}/topics/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, exam_date: examDate }),
  });

  if (!res.ok) {
    return { apiError: { message: await res.text(), status: res.status } };
  }
  return res.json();
};

export const uploadTopicPDF = async (topicId, file) => {
  const { csrfToken, apiError } = await _getAPI('csrf_token');
  if (apiError) return { apiError };

  const { API_URL } = getConfig();
  const form = new FormData();
  form.append('pdf_file', file);

  const res = await fetch(`${API_URL}/topics/${topicId}/`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'X-CSRFToken': csrfToken },
    body: form,
  });

  if (!res.ok) {
    return { apiError: { message: await res.text(), status: res.status } };
  }
  return res.json();
};

// TESTS

export const getTests = async () => {
  return _getAPI('tests/');
};

export const getTest = async testId => {
  return _getAPI(`tests/${testId}/`);
};

export const createTest = async topicId => {
  const { csrfToken, apiError } = await _getAPI('csrf_token');
  if (apiError) return { apiError };

  const { API_URL } = getConfig();
  const res = await fetch(`${API_URL}/tests/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic: topicId }),
  });

  if (!res.ok) {
    return { apiError: { message: await res.text(), status: res.status } };
  }
  return res.json();
};
