const API_KEY =
  "dae990cd86a8f11db58c1065e67360ce01a32d7c62a25cc227833e4fbf6a9978";

const tickersHandlers = new Map();

// export const loadTickers = (tickers) =>
//   fetch(
//     `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(
//       ","
//     )}&api_key=${API_KEY}`
//   )
//     .then((response) => response.json())
//     .then((rawData) =>
//       Object.fromEntries(
//         Object.entries(rawData).map(([key, value]) => [key, 1 / value])
//       )
//     );

export const loadTickersMultiple = (tickers) =>
  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers.join(
      ","
    )}&tsyms=USD&api_key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((rawData) =>
      Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      )
    );

const loadTickers = () => {
  if (tickersHandlers.size === 0) {
    return;
  }

  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
      ...tickersHandlers.keys(),
    ].join(",")}&tsyms=USD&api_key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((rawData) => {
      const updatedPricees = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      );

      Object.entries(updatedPricees).forEach(([currency, newPrice]) => {
        const handlers = tickersHandlers.get(currency) ?? [];
        handlers.forEach((fn) => fn(newPrice));
      });
    });
};

export const subscribeToTicker = (ticker, callback) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, callback]);
};
export const unsubscribeFromTicker = (ticker, callback) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(
    ticker,
    subscribers.filter((fn) => fn != callback)
  );
};

setInterval(loadTickers(), 5000);
// window.tickers = tickers;
