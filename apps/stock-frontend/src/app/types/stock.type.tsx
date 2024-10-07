type StockSearchResultItem = {
    label: string;
    value: string;
}

type StockInfo = {
    symbol: string;
    name: string;
    currency?: string;
    stockExchange?: string;
    exchangeShortName?: string;
};

type StockQuote = {
    symbol: string;
    price: number;
    volume: number;
};

type StockItem = {
    symbol: string;
    name: string;
    price: number;
    volume: number;
    currency: string;
    exchange: string;
    lastUpdated?: Date;
};