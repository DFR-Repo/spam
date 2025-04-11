const mineflayer = require('mineflayer');

const SERVER_HOST = 'empmc.xyz';
const SERVER_PORT = 19132;
const BOT_COUNT = 500; // عدد البوتات

function createBot(index) {
  const username = `Bot_${Math.floor(Math.random() * 10000)}_${index}`;

  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: username
  });

  bot.on('login', () => {
    console.log(`[${username}] ✅ Logged in`);
    setTimeout(() => {
      bot.chat('/register 123456 123456');
      bot.chat('/login 123456');
    }, 5000);
  });

  bot.on('end', () => {
    console.log(`[${username}] ❌ Disconnected. Reconnecting...`);
    setTimeout(() => createBot(index), 10000);
  });

  bot.on('error', (err) => {
    console.error(`[${username}] ⚠️ Error: ${err.message}`);
  });
}

for (let i = 0; i < BOT_COUNT; i++) {
  setTimeout(() => createBot(i), i * 2000);
}
