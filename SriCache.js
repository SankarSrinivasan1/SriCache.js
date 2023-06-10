// SriCache.js is a JavaScript library that provides client-side caching and storage capabilities with additional features such as size limit, LRU eviction, and JSON serialization.
// It allows you to easily store and retrieve data in the client's browser, providing efficient and flexible caching functionality.
// Contact Sankar Srinivasan at petra.srini@gmail.com 

class SriCache {

  constructor(maxSize = Infinity) {

    this.cache = new Map();

    this.expirationTimes = new Map();

    this.maxSize = maxSize;

  }

  set(key, data, expirationTime = null) {

    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {

      this.evictLRU();

    }

    this.cache.set(key, data);

    if (expirationTime) {

      const expirationTimestamp = Date.now() + expirationTime * 1000;

      this.expirationTimes.set(key, expirationTimestamp);

      setTimeout(() => {

        this.remove(key);

      }, expirationTime * 1000);

    }

  }

  get(key) {

    const data = this.cache.get(key);

    const expirationTime = this.expirationTimes.get(key);

    if (data && (!expirationTime || Date.now() < expirationTime)) {

      this.promoteKey(key);

      return data;

    }

    this.remove(key);

    return null;

  }

  remove(key) {

    this.cache.delete(key);

    this.expirationTimes.delete(key);

  }

  clear() {

    this.cache.clear();

    this.expirationTimes.clear();

  }

  evictLRU() {

    const lruKey = this.cache.keys().next().value;

    this.remove(lruKey);

  }

  getSize() {

    return this.cache.size;

  }

  serialize() {

    const serializedCache = {

      cache: Array.from(this.cache),

      expirationTimes: Array.from(this.expirationTimes),

      maxSize: this.maxSize,

    };

    return JSON.stringify(serializedCache);

  }

  static deserialize(serializedData) {

    const { cache, expirationTimes, maxSize } = JSON.parse(serializedData);

    const cacheInstance = new SriCache(maxSize);

    for (const [key, data] of cache) {

      cacheInstance.cache.set(key, data);

    }

    for (const [key, expirationTime] of expirationTimes) {

      cacheInstance.expirationTimes.set(key, expirationTime);

    }

    return cacheInstance;

  }

}

