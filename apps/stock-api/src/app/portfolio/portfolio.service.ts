import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio } from './portfolio.schema';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectModel('Portfolio') private readonly portfolioModel: Model<Portfolio>,
    ) { }

    async findAll(): Promise<Portfolio[]> {
        return this.portfolioModel.find().exec();
    }

    async create(portfolio: Portfolio): Promise<Portfolio> {
        const newPortfolio = new this.portfolioModel(portfolio);
        return newPortfolio.save();
    }
}