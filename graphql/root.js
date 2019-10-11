const mock = require('../db/mock');

const BONUS_GACHA = 10; // get 1 SR gacha every 10 pulls

const bonus = () => {
  const filtered = mock.filter(val => val.rank === 'SR');
  const prize = filtered[Math.floor(Math.random() * filtered.length)];

  return({ ...prize, bonus: true });
}

const rng = (length, count = 0, data = []) => {
  const chance = Math.floor(Math.random() * 100);
  if (count >= length) {
    return data;
  } else if (count < length) {
    let found = false;
    mock.forEach(val => {
      if (count < length && !found) {
        if (val.rate >= chance) {
          data.push(val);
          found = true;
          count++;
        }
      }
    });

    // Get bonus random SR gacha every 10 pulls
    if ((count % BONUS_GACHA) === 0) {
      const item = bonus();
      data.push(item);
    }

    return rng(length, count, data);
  }
}

const root = {
  pull: async function ({ numPull }) {
    let output = [];

    output = rng(numPull);

    return output;
  }
};

module.exports = root;
