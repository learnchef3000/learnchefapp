// Copyright 2025 LearnChef3000

import { openDB } from 'idb';

const dbName = 'learnchef-demo';
const storeName = 'avocart';
const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(storeName);
  },
});

async function get(key) {
  return (await dbPromise).get(storeName, key);
}

async function set(key, val) {
  return (await dbPromise).put(storeName, val, key);
}

async function del(key) {
  return (await dbPromise).delete(storeName, key);
}

async function clear() {
  return (await dbPromise).clear(storeName);
}

async function all() {
  return (await dbPromise).getAll(storeName);
}

async function deleteDB() {
  return await deleteDB(dbName);
}

export default { get, set, del, clear, all, deleteDB };
