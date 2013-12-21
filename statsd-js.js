define(function () {
    var statsdImage = new Image(),
        setUrl = function (host, port) {
            url = 'http://' + host;
            if (port) {
                url += ':' + port;
            }
            url += '/transparent.gif';
        },
        send = function (bucket, type, value) {
            var metricUrl = url + '?b=' + bucket + '&t=' + type + '&v=' + value;

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
            config: config,
            counter: function(bucket, value) {
                send(bucket, 'c', value);
            },
            gauge: function(bucket, value) {
                send(bucket, 'g', value);
            },
            timer: function(bucket, value) {
                send(bucket, 't', value);
            }
        };
    };
});
