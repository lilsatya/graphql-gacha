# Gacha Simulator

Trying graphql express for gacha simulator.

## Installation

```bash
yarn && yarn start
```

## Usage

open:
```
localhost:3000/graphql
```

use this query:
```
{
  pull(numPull:10) {
    rank,
    name,
    power,
    bonus
  }
}
```