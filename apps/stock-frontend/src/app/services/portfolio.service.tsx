import axios from "axios";

export async function fetchPortfolio(userId: string): Promise<any> {
    const response = await axios.get(`http://localhost:3000/api/portfolio/${userId}`);
    return response.data;
}

export async function addNewStockToPortfolio(userId: string, stock: StockItem): Promise<void> {
    await axios.post(`http://localhost:3000/api/portfolio/${userId}`, stock);
}

export async function updateStockOnPortfolio(userId: string, stock: StockItem): Promise<void> {
    await axios.put(`http://localhost:3000/api/portfolio/${userId}`, stock);
}

export async function removeStockFromPortfolio(userId: string, symbol: string): Promise<void> {
    await axios.delete(`http://localhost:3000/api/portfolio/${userId}/${symbol}`);
}