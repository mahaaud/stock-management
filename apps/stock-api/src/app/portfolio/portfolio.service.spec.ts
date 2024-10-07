import { Test, TestingModule } from '@nestjs/testing';

import PortfolioService from './portfolio.service';
import { StockItemDto } from './dto/stock.dto';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio } from './portfolio.schema';

const testUserId = 'unit-test';
const arrangedStockItemDto: StockItemDto = {
    symbol: 'TTST',
    name: 'Test Company',
    price: 234.56,
    volume: 78901234,
    currency: 'THB',
    exchange: 'SET',
    lastUpdated: new Date()
}
const mockPortfolio = {
    _id: 'dk3oy2xbr',
    userId: testUserId,
    stocks: [
        arrangedStockItemDto
    ],
    lastUpdated: new Date(),
    save: jest.fn().mockResolvedValue(this) // Mock save function
};

// Mock Mongoose Query object with exec
const mockQuery = {
    exec: jest.fn()
};

const mockPortfolioModelMethods = {
    findOne: jest.fn().mockReturnValue(mockQuery),
    deleteOne: jest.fn().mockReturnValue(mockQuery),
};

describe('PortfolioService', () => {
    let service: PortfolioService;
    let portfolioModel: Model<Portfolio>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PortfolioService,
                {
                    provide: getModelToken('Portfolio'),
                    useValue: {
                        ...mockPortfolioModelMethods
                    }
                },
            ],
        }).compile();

        service = module.get<PortfolioService>(PortfolioService);
        portfolioModel = module.get<Model<Portfolio>>(getModelToken('Portfolio'));
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls and instances
    });

    describe('Get Portfolio', () => {
        it('should return a portfolio for a valid userId', async () => {
            // Arrange: Mock the query's exec() to resolve with a portfolio
            mockQuery.exec.mockResolvedValue(mockPortfolio);

            // Act: Call the service method
            const result = await service.getUserPortfolio(testUserId);

            // Assert: Validate the result and that the mock was called correctly
            expect(result).toEqual(mockPortfolio);
            expect(portfolioModel.findOne).toHaveBeenCalledWith({ userId: testUserId });
            expect(mockQuery.exec).toHaveBeenCalled();
        });

        it('should return null if portfolio is not found', async () => {
            // Arrange: Mock the query's exec() to resolve with null (portfolio not found)
            mockQuery.exec.mockResolvedValue(null);

            // Act & Assert: Expect an exception when calling the service with an invalid userId
            expect(await service.getUserPortfolio('invalidUserId')).toBeNull();
        });
    });

    // Above code just show the idea of doing unit test with this project.
    // There should also be the unit test of create, update, and delete here.
});