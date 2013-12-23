define(function () {
    var statsdImage = new Image(),
        getNamespace = function () {
            if (namespace) {
                return namespace + '.';
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
            var metricUrl = url + '?b=' + getNamespace() + bucket + '&t=' + type + '&d=' + delta;

            statsdImage.src = metricUrl;
        },
        namespace,
        url;

    return function(config) {
        if (!config) {
            throw new Error('No configuration');
        }
        if (!config.host) {
            throw new Error('Configuration host missing');
        }
        setUrl(config.host, config.port);

        if (config.namespace) {
            namespace = config.namespace;
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
