import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  // open the database
  const jateDb = await openDB('jate', 1);
  // create a read and write transaction to allow editing of the data
  const tx = jateDb.transaction('jate', 'readwrite');
  // store the content to id as there is only one thing to store
  const store = tx.objectStore('jate');
  const request = store.add({ id: 1, content });
  // confirm the request
  const result = await request;
  console.log('Data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  // open the database
  const jateDb = await openDB('jate', 1);
  // we only want to read the data not edit or delete the data
  const tx = jateDb.transaction('jate', 'readonly');
  // request all the stored data
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result.content;
}
initdb();
