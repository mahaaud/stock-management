import { Controller, Get, Post, Body } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from './portfolio.schema';

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) { }

    @Get()
    async getAllPortfolios(): Promise<Portfolio[]> {
        return this.portfolioService.findAll();
    }

    @Post()
    async createPortfolio(@Body() portfolio: Portfolio): Promise<Portfolio> {
        return this.portfolioService.create(portfolio);
    }
}