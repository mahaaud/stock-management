import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Typography, Breadcrumb, Button, Tooltip, Flex } from 'antd';
import portfolioStore from '../../stores/portfolio.store';
import { DesignConstant } from '../constants/design.constant';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getUserId } from '../helpers/user.helper';
import { DeleteOutlined } from '@ant-design/icons';
import { ConfirmDeleteModal } from '../components/modals/confirmdelete.component';
import { fetchAllExistedStocksQuote } from '../services/stock.service';
import { StockInformationModal } from '../components/modals/stockinformation.component';

const { Title, Text, Link } = Typography;

const flattenStock = (portfolio: any) => {
    if (!portfolio) {
        return portfolio;
    }

    return (portfolio?.stocks || [])
        .map((stocks: any[], index: any) => ({
            ...stocks,
            key: index, // Add a unique key for each row
        })
    );
}

const PortfolioPage = observer(() => {

    const userId = getUserId();

    // Extract and flatten the stocks array from the portfolio data
    let flattenedStocks = flattenStock(portfolioStore.portfolio);

    const fetchAllStocks = async () => {
        await fetchAllExistedStocksQuote();
    };

    useEffect(() => {
        fetchAllStocks();
        portfolioStore.getUserPortfolio(userId);
        flattenedStocks = flattenStock(portfolioStore.portfolio);
    }, []);

    const [selectedViewStock, setSelectedViewStock]  = useState<StockItem>();
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [stockSymbolToBeDeleted, setStockSymbolToBeDeleted] = useState<string>('');

    const showConfirmDeleteModal = (symbol: string) => {
        setStockSymbolToBeDeleted(symbol);
        setConfirmDeleteModalOpen(true);
    }

    const hideConfirmDeleteModal = () => {
        setStockSymbolToBeDeleted('');
        setConfirmDeleteModalOpen(false);
    }

    const deleteStockItem = async () => {
        await portfolioStore.removeStock(userId, stockSymbolToBeDeleted);
        hideConfirmDeleteModal();
    }

    const viewStockInfo = (symbol: string) => {
        const selectedStockItem = flattenedStocks.find((item: { symbol: string; }) => item.symbol == symbol);
        setSelectedViewStock(selectedStockItem);
    }

    const columns = [
        {
            title: 'Symbol',
            render: (_: any, record: { symbol: string }) => {
                return (
                    <Text strong>{record.symbol}</Text>
                );
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Price',
            render: (_: any, record: { price: number; currency: number; lastUpdated: string }) => {
                const colLastUpdated = new Date(record.lastUpdated);
                return (
                    <Tooltip placement="top" title={`Last updated: ${colLastUpdated.toLocaleString()}`}>
                        {record.price.toLocaleString(undefined, { maximumFractionDigits: 2 })} {record.currency}
                    </Tooltip>
                )
            }
        },
        {
            title: 'Volume',
            render: (_: any, record: { volume: number }) => {
                return `${record.volume.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
            }
        },
        {
            title: 'Action',
            render: (_: any, record: { symbol: string; }) => (
                <Flex gap="small" wrap>
                    <Button type="primary" onClick={() => viewStockInfo(record.symbol)} shape="circle" icon={<InfoCircleOutlined />}></Button>
                    <Button type="primary" onClick={() => showConfirmDeleteModal(record.symbol)} shape="circle" icon={<DeleteOutlined />} danger></Button>
                </Flex>
            )
        }
    ];

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: DesignConstant.CSS_HTML_INNER,
                }}
            />
            <StockInformationModal viewStockItem={selectedViewStock} showLastUpdated={true} />
            <ConfirmDeleteModal isOpen={confirmDeleteModalOpen} onConfirmHandle={deleteStockItem} onCancelHandle={hideConfirmDeleteModal} itemName={stockSymbolToBeDeleted} />
            <div className="wrapper">
                <div className="container">
                    <div id="welcome">
                        <Title>
                            <span> My beloved, </span>
                            Portfolio
                        </Title>
                    </div>
                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />,
                            },
                            {
                                title: 'My Portfolio',
                            },
                        ]}
                    />
                    <Table dataSource={flattenedStocks} columns={columns} />
                </div>
                <div className="container">
                    <Link href="/">Back to Home</Link>
                </div>
            </div>
        </>
    );
});

export default PortfolioPage;