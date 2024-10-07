import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSchema } from './portfolio.schema';
import { PortfolioController } from './portfolio.controller';
import PortfolioService from './portfolio.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Portfolio', schema: PortfolioSchema }]),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})

export class PortfolioModule {}
