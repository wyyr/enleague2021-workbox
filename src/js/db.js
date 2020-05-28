import {openDB} from 'idb';

const dbPromise = openDB('football', 1, {
  upgrade(db) {
    const team = db.createObjectStore('team', {
      keyPath: 'id',
    });
    team.createIndex('name', 'name');
  },
});

const addFavoriteTeam = (team) => {
  dbPromise.then((db) => {
    const tx = db.transaction('team', 'readwrite');
    const store = tx.objectStore('team');

    store.add(team);

    return tx.complete;
  }).then(() => {
    console.log('Team berhasil di simpan!');
  });
};

const removeFavoriteTeam = (id) => {
  dbPromise.then((db) => {
    const tx = db.transaction('team', 'readwrite');
    const store = tx.objectStore('team');
    store.delete(id);
    return tx.complete;
  }).then((data) => {
    console.log('Team berhasil di hapus!');
  }).catch((e) => reject(e));
};

const getBookmarkById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const tx = db.transaction('team', 'readonly');
      const store = tx.objectStore('team');

      return store.get(id);
    }).then((data) => {
      resolve(data);
    }).catch((e) => reject(e));
  });
};

const getBookmarks = () => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const tx = db.transaction('team');
      const store = tx.objectStore('team');

      return store.getAll();
    }).then((data) => {
      resolve(data);
    }).catch((e) => reject(e));
  });
};

export {
  addFavoriteTeam,
  removeFavoriteTeam,
  getBookmarks,
  getBookmarkById,
};
