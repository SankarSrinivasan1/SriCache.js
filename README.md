# SriCache.js



SriCache.js is a JavaScript library that provides client-side caching and storage capabilities with additional features such as size limit, LRU eviction, and JSON serialization. It allows you to easily store and retrieve data in the client's browser, providing efficient and flexible caching functionality.

## Features

- Store data in cache with optional expiration time.

- Retrieve data from cache by key.

- Remove data from cache.

- Clear the entire cache.

- Automatic eviction of least recently used (LRU) items when the cache exceeds the specified size limit.

- JSON serialization and deserialization for easy storage or transmission of the cache.

## Installation

You can include `SriCache.js` in your project by downloading the script and including it in your HTML file:

```html

<script src="path/to/sricache.js"></script>

```

Alternatively, you can also install `SriCache.js` using npm:

```shell

npm install sricache

```

Then, you can import it into your JavaScript file:

```javascript

import SriCache from 'sricache';

```

## Usage

Here's an example of how to use `SriCache.js`:

```javascript

// Create a new instance of SriCache with a maximum size of 3

const cache = new SriCache(3);

// Store data in cache

cache.set('key1', 'Data 1', 60); // Expires in 60 seconds

cache.set('key2', 'Data 2');

cache.set('key3', 'Data 3');

// Retrieve data from cache

const data1 = cache.get('key1');

const data2 = cache.get('key2');

console.log(data1, data2); // Output: Data 1 Data 2

// Add more data to exceed the maximum size

cache.set('key4', 'Data 4');

cache.set('key5', 'Data 5');

// Retrieve data from cache

const data3 = cache.get('key3');

console.log(data3); // Output: null (evicted due to exceeding the maximum size)

// Serialize the cache

const serializedCache = cache.serialize();

console.log(serializedCache);

// Deserialize the cache

const deserializedCache = SriCache.deserialize(serializedCache);

// Retrieve data from deserialized cache

const deserializedData1 = deserializedCache.get('key1');

const deserializedData2 = deserializedCache.get('key2');

console.log(deserializedData1, deserializedData2); // Output: Data 1 Data 2

// Clear the cache

deserializedCache.clear();

console.log(deserializedCache.getSize()); // Output: 0

```

## API

### SriCache(maxSize)

Creates a new instance of the `SriCache` class with an optional maximum size limit (`maxSize`) for the cache. If no `maxSize` is provided, the cache size is set to `Infinity`.

```javascript

const cache = new SriCache(100); // Create a cache with a maximum size of 100 items

```

### set(key, data, expirationTime)

Stores data in the cache with the specified key. You can also provide an optional expiration time (in seconds) for the data. If expiration time is set, the data will be automatically removed from the cache after the specified duration.

```javascript

cache.set('myKey', 'Hello, SriCache!', 60); // Store data with key 'myKey' and expiration time of 60 seconds

```

### get(key)

Retrieves data from the cache based on the specified key. If the data is present in the cache and has not expired, it will be returned. Otherwise, it will be removed from the cache, and `null` will be returned.

```javascript

const cachedData = cache.get('myKey');

console.log(cachedData); // Output: Hello, SriCache!

```

### remove(key)

Removes the data associated with the specified key from the cache.

```javascript

cache.remove('myKey'); // Remove data with key 'myKey' from the cache

```

### clear()

Clears the entire cache, removing all stored data.

```javascript

cache.clear(); // Clear the cache

```

### getSize()

Returns the current size of the cache, i.e., the number of items stored in the cache.

```javascript

const size = cache.getSize();

console.log(size); // Output: 3

```

### serialize()

Serializes the cache object, expiration times, and the maximum size limit into a JSON string.

```javascript

const serializedCache = cache.serialize();

console.log(serializedCache);

```

### SriCache.deserialize(serializedData)

Recreates a `SriCache` instance from a serialized JSON string. It returns the deserialized cache object.

```javascript

const deserializedCache = SriCache.deserialize(serializedCache);

```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contributing

Contributions to SriCache.js are welcome! If you find any issues or would like to suggest improvements, please create a new issue or submit a pull request.

## Acknowledgments

SriCache.js is inspired by the concept of client-side caching and the need for a simple yet powerful caching library.

## Contact

For any inquiries or questions, please contact Sankar Srinivasan at petra.srini@gmail.com

---

Thank you for choosing SriCache.js! We hope this library enhances your client-side caching experience.
