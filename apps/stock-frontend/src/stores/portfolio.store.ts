import { makeAutoObservable } from "mobx";
import { fetchPortfolio } from "../app/services/portfolio.service";

class PortfolioStore {

    portfolio = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getAllUserPortfolios() {
        try {
            const respond = await fetchPortfolio();
            this.portfolio = respond.data;
        } catch (error) {
            console.error("Error fetching portfolio", error);
        }
    }

    addStock(stock) {
        this.portfolio.push(stock);
    }

    removeStock(stockSymbol) {
        this.portfolio = this.portfolio.filter(stock => stock.symbol !== stockSymbol);
    }

    get totalValue() {
        return this.portfolio.reduce((total, stock) => total + (stock.quantity * stock.price), 0);
    }

}

const portfolioStore = new PortfolioStore();
export default portfolioStore;