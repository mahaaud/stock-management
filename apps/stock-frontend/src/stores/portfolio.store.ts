import { makeAutoObservable } from "mobx";
import { addNewStockToPortfolio, fetchPortfolio, removeStockFromPortfolio } from "../app/services/portfolio.service";
import { fetchSelectedStockQuote } from "../app/services/stock.service";

class PortfolioStore {

    portfolio: Portfolio[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getUserPortfolio(userId: string): Promise<void> {
        this.portfolio = await fetchPortfolio(userId);
    }


    async addStock(userId: string, stock: StockItem): Promise<void> {
        await addNewStockToPortfolio(userId, stock);
        this.getUserPortfolio(userId);
    }

    async removeStock(userId: string, symbol: string) {
        await removeStockFromPortfolio(userId, symbol);
        this.getUserPortfolio(userId);
    }

}

const portfolioStore = new PortfolioStore();
export default portfolioStore;