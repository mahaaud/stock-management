import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio } from './portfolio.schema';
import { StockItemDto } from './dto/stock.dto';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectModel('Portfolio') private readonly portfolioModel: Model<Portfolio>,
    ) { }

    async getUserPortfolio(userId: string): Promise<Portfolio> {
        return this.portfolioModel.findOne({ userId }).exec();
    }

    async create(userId: string, stock: StockItemDto): Promise<Portfolio> {
        const portfolio = await this.portfolioModel.findOne({ userId }).exec();

        if (!portfolio) {
            const newPortfolio = new this.portfolioModel({
                userId,
                stocks: [stock]
            })

            return newPortfolio.save();
        }

        const foundExistedItem = portfolio.stocks.find(item => item.symbol == stock.symbol);
        if (foundExistedItem) {
            throw new BadRequestException(`Stock symbol '${stock.symbol}' already existed.`);
        }
        
        portfolio.stocks.push(stock);

        return portfolio.save();
    }

    async update(userId: string, stock: StockItemDto): Promise<Portfolio> {
        const portfolio = await this.portfolioModel.findOne({ userId }).exec();

        if (!portfolio) {
            const newPortfolio = new this.portfolioModel({
                userId,
                stocks: [stock]
            })

            return newPortfolio.save();
        }

        const existedStock = portfolio.stocks.find(item => item.symbol == stock.symbol);
        if (!existedStock) {
            throw new NotFoundException(`Stock symbol '${stock.symbol}' not found.`);
        }

        if (stock.name == existedStock.name &&
            stock.price == existedStock.price &&
            stock.volume == existedStock.volume &&
            stock.currency == existedStock.currency &&
            stock.exchange == existedStock.exchange
        ) {
            return null;
        }

        if (stock.name !== undefined && stock.name !== existedStock.name) {
            existedStock.name = stock.name;
        }

        if (stock.price !== undefined && stock.price !== existedStock.price) {
            existedStock.price = stock.price;
        }

        if (stock.volume !== undefined && stock.volume !== existedStock.volume) {
            existedStock.volume = stock.volume;
        }

        if (stock.currency !== undefined && stock.currency !== existedStock.currency) {
            existedStock.currency = stock.currency;
        }

        if (stock.exchange !== undefined && stock.exchange !== existedStock.exchange) {
            existedStock.exchange = stock.exchange;
        }

        existedStock.lastUpdated = new Date();

        return portfolio.save();
    }

    async delete(userId: string, stockSymbol: string): Promise<Portfolio> {
        const portfolio = await this.portfolioModel.findOne({ userId }).exec();

        if (!portfolio) {
            throw new NotFoundException(`Stock symbol '${stockSymbol}' not found.`);
        }

        // Filter out the stock with the given symbol
        const filteredOutStocks = portfolio.stocks.filter(stock => stock.symbol !== stockSymbol);

        if (filteredOutStocks.length === portfolio.stocks.length) {
            throw new NotFoundException(`Stock symbol '${stockSymbol}' not found.`);
        }

        // Update the stocks array
        portfolio.stocks = filteredOutStocks;

        return portfolio.save();
    }
}