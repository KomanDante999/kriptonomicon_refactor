const API_KEY =
  "c5830f5e427fa14670e0d35f1fd17a70a42551bac738247d2bb81ed27a20b5ae";

export const loadTicker = (tickers) =>
  fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=&${tickers.join(
      ","
    )}tsyms=USD&api_key=${API_KEY}`
  ).then((response) => response.json());
