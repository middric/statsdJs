```javascript
require(['statsd-js'], function (statsd) {
    // Send counter
    statsd.counter('bucket-name', 1);

    // Decrement counter
    statsd.decrement('bucket-name');     // By 1
    statsd.decrement('bucket-name', 10); // By 10

    // Increment counter
    statsd.increment('bucket-name');     // By 1
    statsd.increment('bucket-name', 10); // By 10

    // Send gauge
    statsd.gauge('bucket-name', 1);

    // Send timer
    statsd.timing('bucket-name', 1000);
});
```
