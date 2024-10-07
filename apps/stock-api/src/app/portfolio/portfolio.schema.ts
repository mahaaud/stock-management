import { Schema, Document } from 'mongoose';

export const StockSchema = new Schema({
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    volume: { type: Number, required: true },
    currency: { type: String, required: true },
    exchange: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

export const PortfolioSchema = new Schema({
    userId: { type: String, required: true },
    stocks: [StockSchema],
});

export interface Portfolio extends Document {
    userId: string;
    stocks: Array<{
        symbol: string;
        name: string;
        price: number;
        volume: number;
        currency: string;
        exchange: string;
        lastUpdated: Date;
    }>;
}