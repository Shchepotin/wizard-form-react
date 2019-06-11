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
          const transaction = e.target.transaction;

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

          if (!db.objectStoreNames.contains('languages')) {
            db.createObjectStore('languages', {
              keyPath: 'id',
            });

            const languages = {
              "en": "English",
              "fr": "French",
              "es": "Spanish",
              "ar": "Arabic",
              "cmn": "Mandarin",
              "ru": "Russian",
              "pt": "Portuguese",
              "de": "German",
              "ja": "Japanese",
              "hi": "Hindi",
              "ms": "Malay",
              "fa": "Persian",
              "sw": "Swahili",
              "ta": "Tamil",
              "it": "Italian",
              "nl": "Dutch",
              "bn": "Bengali",
              "tr": "Turkish",
              "vi": "Vietnamese",
              "pl": "Polish",
              "jv": "Javanese",
              "pa": "Punjabi",
              "th": "Thai",
              "ko": "Korean"
            };

            Object.keys(languages).forEach((id) => {
              transaction.objectStore('languages')
                .put({
                  id,
                  value: id,
                  label: languages[id],
                });
            });
          }

          if (!db.objectStoreNames.contains('skills')) {
            db.createObjectStore('skills', {
              keyPath: 'id',
            });

            const skills = [
              {id: 1, value: 1, label: "HTML"},
              {id: 2, value: 2, label: "CSS"},
              {id: 3, value: 3, label: "Javascript"},
              {id: 4, value: 4, label: "React"},
              {id: 5, value: 5, label: "Angular"},
              {id: 6, value: 6, label: "jQuery"},
              {id: 7, value: 7, label: "NodeJS"},
              {id: 8, value: 8, label: "Python"},
              {id: 9, value: 9, label: "PHP"},
              {id: 10, value: 10, label: "Ruby On Rails"},
              {id: 11, value: 11, label: "SQL"},
              {id: 12, value: 12, label: "BackboneJS"},
              {id: 13, value: 13, label: "Web Design"},
              {id: 14, value: 14, label: "Project management"},
              {id: 15, value: 15, label: "Git"},
              {id: 16, value: 16, label: "Docker"},
              {id: 17, value: 17, label: "AWS Lambda"},
              {id: 18, value: 18, label: "Firebase"},
            ];

            skills.forEach((item) => {
              transaction.objectStore('skills')
                .put(item);
            });
          }

          if (!db.objectStoreNames.contains('hobbies')) {
            db.createObjectStore('hobbies', {
              keyPath: 'id',
            });

            let hobbies = [
              {id: 1, value: 1, label: "Art"},
              {id: 2, value: 2, label: "Sport, fitness, aerobica and staff like that"},
              {id: 3, value: 3, label: "I just want to play games, I’m not living in this life"},
              {id: 4, value: 4, label: "I’m a female... I’m doing nothing. Every day."},
              {id: 5, value: 5, label: "Guitar, guitar and guitar again. I’m fall in love with it."},
              {id: 6, value: 6, label: "WTF is “hobbies”???"},
            ];

            hobbies.forEach((item) => {
              transaction.objectStore('hobbies')
                .put(item);
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
        resolve({id: e.target.result, ...data,});
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
