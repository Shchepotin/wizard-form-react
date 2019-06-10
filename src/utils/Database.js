export default class Database {
  static db = null;

  constructor(tableName) {
    this.tableName = tableName;
    this.conditions = [];
  }

  /**
   * Singleton
   *
   * @returns {Promise<Database>}
   */
  static getInstance() {
    return new Promise((resolve, reject) => {
      if (Database.db === null) {
        const indexedDB =
          window.indexedDB ||
          window.mozIndexedDB ||
          window.webkitIndexedDB ||
          window.msIndexedDB;

        const connection = indexedDB.open('wizard', 1);

        connection.onupgradeneeded = e => {
          const db = e.target.result;

          if (!db.objectStoreNames.contains('userDraft')) {
            db.createObjectStore('userDraft', {
              keyPath: 'id',
            });
          }

          if (!db.objectStoreNames.contains('users')) {
            db.createObjectStore('users', {
              keyPath: 'id',
              autoIncrement: true,
            });
          }
        };

        connection.onsuccess = e => {
          Database.db = e.target.result;

          resolve(Database.db);
        };

        connection.onerror = e => {
          reject(e);
        }
      } else {
        resolve(Database.db);
      }
    });
  }

  static table(tableName) {
    const db = new Database(tableName);

    return db;
  }

  save(data) {
    return new Promise(async (resolve) => {
      await Database.getInstance();

      const request = Database.db
        .transaction([this.tableName], 'readwrite')
        .objectStore(this.tableName)
        .put(data);

      request.onsuccess = (e) => {
        resolve({ id: e.target.result, ...data, });
      };
    });
  }

  /**
   * Get items.
   *
   * @returns {Promise<Array>}
   */
  get() {
    return new Promise(async (resolve) => {
      const result = [];

      await Database.getInstance();

      const request = Database.db
        .transaction([this.tableName], 'readonly')
        .objectStore(this.tableName)
        .openCursor();

      request.onsuccess = e => {
        const cursor = e.target.result;

        if (cursor) {
          if (this.applyConditions(cursor.value)) {
            result.push(cursor.value);
          }

          cursor.continue();
        } else {
          resolve(result);
        }
      };
    });
  };

  /**
   * Get first item.
   *
   * @returns {Promise<Object>}
   */
  first() {
    return new Promise(async (resolve) => {
      let result = null;
      await Database.getInstance();

      const request = Database.db
        .transaction([this.tableName], 'readonly')
        .objectStore(this.tableName)
        .openCursor();

      request.onsuccess = e => {
        const cursor = e.target.result;

        if (cursor) {
          result = this.applyConditions(cursor.value);

          if (result !== null) {
            resolve(result);
          } else {
            cursor.continue();
          }
        } else {
          resolve(result);
        }
      };
    });
  }

  /**
   * Where condition.
   *
   * @param condition {function}
   * @returns {Database}
   */
  where(condition) {
    this.conditions.push(condition);

    return this;
  }

  applyConditions(result) {
    return this.conditions
      .map(item => item(result))
      .filter(item => !!item)
      .length === this.conditions.length ? result : null;
  }
};
