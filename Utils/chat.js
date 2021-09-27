//register chat
const Redis = require("ioredis");
const redis = new Redis(
  process.env.REDIS_URL ||
    "redis://:p9643d7f730a717a3efbd9e2458bd72bd798134730748198da065c4332c9184cc@ec2-3-82-123-53.compute-1.amazonaws.com:27820",
  {
    tls: {
      rejectUnauthorized: false,
    },
  }
);
const JSONCache = require("redis-json");

const { v4: uuidv4 } = require("uuid");

async function registerChat({ vendor, projectName, influencer }) {
  let address = vendor.id + ":" + influencer.id; //vicomma:3:5
  let load = {
    id: uuidv4(),
    vendorName: vendor.name,
    message: [],
    influencer: influencer.name,
    isActive: true,
  };
  const jsonCache = new JSONCache(redis, { prefix: "vicomma:" });
  const msgCache = new JSONCache(redis, { prefix: "messages:" });
  //save chat to db
  msgCache.set(address, []);
  jsonCache.set(address, load);

  return true;
}

async function isChatRegisted({ vendor, influencer }) {
  return redis.exists(`messages:${vendor.id}:${influencer.id}`);
}

async function getChatMessages(id) {
  const msgCache = new JSONCache(redis, { prefix: "messages:" });
  let data = await getDetails(id);
  return Object.assign({}, { newid: uuidv4(), messages: data });
}

async function getDetails(id) {
  const msgCache = new JSONCache(redis, { prefix: "messages:" });
  let data = await msgCache.get(id);
  return data;
}

function isChatActive(params) {
  return true;
}

async function isExist(params, jsonCache) {
  let data = await jsonCache.get(params);
  data = data === undefined ? {} : data;
  //console.log(!data.hasOwnProperty('id'));
  return data;
}

module.exports = {
  registerChat,
  getChatMessages,
  isChatRegisted,
};
