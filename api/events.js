const Channels = require("pusher");

const {
  APP_ID: appId,
  KEY: key,
  SECRET: secret,
  CLUSTER: cluster
} = process.env;

const channels = new Channels({
  appId,
  key,
  secret,
  cluster
});

module.exports = (req, res) => {
  const { channel = "default", event = "push" } = req.query;
  const data = req.body;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  channels.trigger(channel, event, data, error => {
    res.status(200).end("sent event successfully");
  });
};
