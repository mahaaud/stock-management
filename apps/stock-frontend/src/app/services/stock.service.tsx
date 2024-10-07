import axios from "axios";
import { getUserId } from "../helpers/user.helper";
import { fetchPortfolio, updateStockOnPortfolio } from "./portfolio.service";

export async function fetchSearchStocks(searchInput: string) {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/search?query=${searchInput}&limit=10&apikey=mLGIAujQhrCDIukVHqIeZXhy06GfcEYa`);
    return response.data;
}

export async function fetchSelectedStockQuote(stockData: StockInfo): Promise<StockQuote> {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote-short/${stockData.symbol}?apikey=mLGIAujQhrCDIukVHqIeZXhy06GfcEYa`);
    const selectedStockQuote = response.data.find((item: { symbol: string; }) => item.symbol == stockData.symbol);
    return selectedStockQuote;
}

export async function fetchAllExistedStocksQuote() {
    const userId = getUserId();
    const allAddedStocks = await fetchPortfolio(userId);

    for (const addedStock of allAddedStocks.stocks) {
        const updatedStockInfo: StockInfo = {
            symbol: addedStock.symbol,
            name: addedStock.name,
        };
        const latestUpdatedQuote = await fetchSelectedStockQuote(updatedStockInfo);
        if (latestUpdatedQuote.symbol == addedStock.symbol &&
            latestUpdatedQuote.price == addedStock.price &&
            latestUpdatedQuote.volume == addedStock.volume
        ) {
            continue;
        }

        const latestUpdatedStockItem: StockItem = {
            symbol: addedStock.symbol,
            name: addedStock.name,
            price: latestUpdatedQuote.price,
            volume: latestUpdatedQuote.volume,
            currency: addedStock.currency,
            exchange: addedStock.exchange
        }
        await updateStockOnPortfolio(userId, latestUpdatedStockItem);
    }
}