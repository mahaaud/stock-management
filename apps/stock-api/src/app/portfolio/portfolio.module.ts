import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSchema } from './portfolio.schema';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Portfolio', schema: PortfolioSchema }]),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})

export class PortfolioModule {}
