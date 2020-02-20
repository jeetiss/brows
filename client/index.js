var Pusher = require("pusher-js");

var channels = new Pusher("b99606f098d417058fed", {
  cluster: "eu"
});

var channel = name => {
  var _channel = channels.subscribe(name);

  var off = (event, handler) => {
    _channel.unbind(event, handler);
  }

  return {
    destroy: () => {
      _channel.disconnect();
    },
    on: (event, handler) => {
      _channel.bind(event, handler);

      return () => off(event, handler)
    },
    off,
    trigger: (event, data) => {
      var { fetch } = window;
      return fetch(`https://brows.now.sh/api/v1/${name}/${event}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => {
        if (!res.ok) {
          console.error("failed to push data");
        }
      });
    }
  };
};

export { channel };
