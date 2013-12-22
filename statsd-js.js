define(function () {
    var statsdImage = new Image(),
        setUrl = function (host, port) {
            url = 'http://' + host;
            if (port) {
                url += ':' + port;
            }
            url += '/transparent.gif';
        },
        send = function (bucket, type, delta) {
            var metricUrl = url + '?b=' + bucket + '&t=' + type + '&d=' + delta;

            statsdImage.src = metricUrl;
        },
        url;

    return function(config) {
        if (!config) {
            throw new Error('No configuration');
        }
        if (!config.host) {
            throw new Error('Configuration host missing');
        }
        setUrl(config.host, config.port);

        return {
            counter: function(bucket, value) {
                send(bucket, 'counter', value);
            },
            decrement: function(bucket, value) {
                var delta = value || 1;
                send(bucket, 'decrement', delta);
            },
            increment: function(bucket, value) {
                var delta = value || 1;
                send(bucket, 'increment', delta);
            },
            gauge: function(bucket, value) {
                send(bucket, 'gauge', value);
            },
            timer: function(bucket, value) {
                send(bucket, 'timer', value);
            }
        };
    };
});
