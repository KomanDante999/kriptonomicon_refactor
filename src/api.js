const API_KEY =
  "dae990cd86a8f11db58c1065e67360ce01a32d7c62a25cc227833e4fbf6a9978";

export const loadTickers = (tickers) =>
  fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(
      ","
    )}&api_key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((rawData) =>
      Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, 1 / value])
      )
    );
// Object.entries {a:1,b:7,c:6} => [['a', 1],['b', 7],['c',6]]
