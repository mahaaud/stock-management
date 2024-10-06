type StockSearchResultItem = {
    label: string;
    value: string;
}

type StockItem = {
    symbol: string;
    name: string;
    currency: string;
    stockExchange: string;
    exchangeShortName: string;
};

type StockQuote = {
    symbol: string;
    price: number;
    volume: number;
};