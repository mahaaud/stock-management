import axios from "axios";

export async function fetchPortfolio(userId: string): Promise<any> {
    const response = await axios.get(`${import.meta.env.VITE_PORTFOLIO_API_URL}/api/portfolio/${userId}`);
    return response.data;
}

export async function addNewStockToPortfolio(userId: string, stock: StockItem): Promise<void> {
    await axios.post(`${import.meta.env.VITE_PORTFOLIO_API_URL}/api/portfolio/${userId}`, stock);
}

export async function updateStockOnPortfolio(userId: string, stock: StockItem): Promise<void> {
    await axios.put(`${import.meta.env.VITE_PORTFOLIO_API_URL}/api/portfolio/${userId}`, stock);
}

export async function removeStockFromPortfolio(userId: string, symbol: string): Promise<void> {
    await axios.delete(`${import.meta.env.VITE_PORTFOLIO_API_URL}/api/portfolio/${userId}/${symbol}`);
}