import axios from "axios";

export async function fetchSearchStocks(searchInput: string) {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/search?query=${searchInput}&limit=10&apikey=mLGIAujQhrCDIukVHqIeZXhy06GfcEYa`);
    return response.data;
}

export async function fetchSelectedStockQuote(stockData: StockItem): Promise<StockQuote> {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote-short/${stockData.symbol}?apikey=mLGIAujQhrCDIukVHqIeZXhy06GfcEYa`);
    const selectedStockQuote = response.data.find((item: { symbol: string; }) => item.symbol == stockData.symbol);
    return selectedStockQuote;
}