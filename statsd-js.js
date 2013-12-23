define(function () {
    var statsdImage = new Image(),
        getPrefix = function () {
            if (prefix) {
                return prefix + '.';
            }
            return '';
        },
        setUrl = function (host, port) {
            url = 'http://' + host;
            if (port) {
                url += ':' + port;
            }
            url += '/transparent.gif';
        },
        send = function (bucket, type, delta) {
            var metricUrl = url + '?b=' + getPrefix() + bucket + '&t=' + type + '&d=' + delta;

            statsdImage.src = metricUrl;
        },
        prefix,
        url;

    return function(config) {
        if (!config) {
            throw new Error('No configuration');
        }
        if (!config.host) {
            throw new Error('Configuration host missing');
        }
        setUrl(config.host, config.port);

        if (config.prefix) {
            prefix = config.prefix;
        }

        return {
            counter: function(bucket, delta) {
                send(bucket, 'counter', delta);
            },
            decrement: function(bucket, amount) {
                var delta = amount || 1;
                send(bucket, 'decrement', delta);
            },
            increment: function(bucket, amount) {
                var delta = amount || 1;
                send(bucket, 'increment', delta);
            },
            gauge: function(bucket, delta) {
                send(bucket, 'gauge', delta);
            },
            timer: function(bucket, delta) {
                send(bucket, 'timer', delta);
            }
        };
    };
});
