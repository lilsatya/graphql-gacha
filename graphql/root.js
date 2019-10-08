const mock = require('../db/mock');

const BONUS_GACHA = 10; // get 1 SR gacha every 10 pulls

const unlucky = () => {
  const filtered = mock.filter(val => val.rank === 'R');
  const prize = filtered[Math.floor(Math.random() * filtered.length)];

  return(prize);
}

const bonus = () => {
  const filtered = mock.filter(val => val.rank === 'SR');
  const prize = filtered[Math.floor(Math.random() * filtered.length)];

  return({ ...prize, bonus: true });
}

const rng = (chance, length, count = 0, data = []) => {
  if (count >= length) {
    return data;
  } else if (count < length) {
    mock.forEach(val => {
      if (count < length) {
        if (val.rate >= chance) {
          data.push(val);
          count++;
        }
      }
    });

    // If not getting gacha above R from rng, default to random R gacha
    if (count < length) {
      const item = unlucky();
      data.push(item);
      count++;
    }

    // Get bonus random SR gacha every 10 pulls
    if ((count % BONUS_GACHA) === 0) {
      const item = bonus();
      data.push(item);
    }

    return rng(chance, length, count, data);
  }
}

const root = {
  pull: async function ({ numPull }) {
    let output = [];
    const chance = Math.floor(Math.random() * 100);

    output = rng(chance, numPull);

    return output;
  }
};

module.exports = root;
