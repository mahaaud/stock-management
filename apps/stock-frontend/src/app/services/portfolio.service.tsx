import axios from "axios";

export async function fetchPortfolio() {
    const response = await axios.get('/api/portfolio');
    return response.data;
}