const API_KEY =
  "4969353a3c3c68dc7c604fc143f9f091fecaa8bf2cef74d4630c47d80613599a";

export const loadTicker = (tickers) =>
  fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(
      ","
    )}tsyms=USD&api_key=${API_KEY}`
  ).then((response) => response.json());
