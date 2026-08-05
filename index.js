const dns = require('node:dns');
const express = require('express');
const cors = require('cors');
const { Noco } = require('nocodb');

// ref: https://github.com/nodejs/node/issues/40702#issuecomment-1103623246
dns.setDefaultResultOrder('ipv4first');

const server = express();
server.enable('trust proxy');
server.use(cors());
server.set('view engine', 'ejs');

(async () => {
  const httpServer = server.listen(process.env.PORT || 8080, () => {
    console.log(`NocoDB listening on ${process.env.PORT || 8080}`);
  });
  server.use(await Noco.init({}, httpServer, server));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
