import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from './portfolio.schema';
import { StockItemDto } from './dto/stock.dto';

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) { }

    @Get(':userId')
    async getAllPortfolios(
        @Param('userId') userId: string
    ): Promise<Portfolio> {
        return this.portfolioService.getUserPortfolio(userId);
    }

    @Post(':userId')
    async addStock(
        @Param('userId') userId: string,
        @Body() stock: StockItemDto
    ): Promise<Portfolio> {
        return this.portfolioService.create(userId, stock);
    }

    @Put(':userId')
    async updateStock(
        @Param('userId') userId: string,
        @Body() stock: StockItemDto
    ): Promise<Portfolio> {
        return this.portfolioService.update(userId, stock);
    }

    @Delete(':userId/:symbol')
    async deleteStock(
        @Param('userId') userId: string,
        @Param('symbol') symbol: string
    ): Promise<Portfolio> {
        return this.portfolioService.delete(userId, symbol);
    }
}