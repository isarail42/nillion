require('colors').config;
const readlineSync = require('readline-sync');
const {
  initWalletsFromMnemonic,
  initWalletsFromPrivateKey,
} = require('./src/initWallets');
const { sleep } = require('./src/sleep');
const { sendTransaction } = require('./src/sendTransaction');
const figlet = require('figlet');
(async () => {
  console.clear();
  console.log(figlet.textSync('ZERO2HERO').rainbow);
  console.log(' Welcome mấy thèn ML  !'.green);
  console.log(' Telegram [https://t.me/zero2hero100x]'.red);

  const walletChoice = parseInt(
    readlineSync.question(
      ' 0 seed phase, 1 private key: '
        .blue
    ),
    10
  );

  let wallets;
  if (walletChoice === 0) {
    wallets = await initWalletsFromMnemonic();
  } else if (walletChoice === 1) {
    wallets = await initWalletsFromPrivateKey();
  } else {
    console.error('Lựa chọn không hợp lệ. Đang thoát...');
    return;
  }

  const txCount = parseInt(
    readlineSync.question('Bạn muốn gửi bao nhiêu giao dịch? '.yellow),
    10
  );

  for (let i = 0; i < txCount; i++) {
    for (const wallet of wallets) {
      await sendTransaction(wallet);
    }
    if (txCount > 1 && i < txCount - 1) {
      const sleepDuration =
        Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;
      console.log(
        `Ngủ cho ${sleepDuration / 1000} giây... (${i + 1}/${txCount})`
          .green
      );
      await sleep(sleepDuration);
    }
  }

  console.log('Mọi giao dịch đều được thực hiện!'.green);
})();
