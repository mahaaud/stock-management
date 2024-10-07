import { Modal, Button, Typography, Statistic, Col, Row  } from "antd";
import { useEffect, useState } from "react";
import { fetchSelectedStockQuote } from "../../services/stock.service";
import { addNewStockToPortfolio } from "../../services/portfolio.service";
import { getUserId } from "../../helpers/user.helper";
const { Title, Paragraph, Text } = Typography;

export function StockInformationModal({ selectedStock, viewStockItem, onSuccess, onWarning, onError, showLastUpdated = false }: any): any {

    const [openState, setOpenState] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stockItemDisplay, setStockItemDisplay] = useState<StockItem>();
    const [addToPortfolioBtnLoading, setAddToPortfolioBtnLoading] = useState(false);

    useEffect(() => {
        if (viewStockItem) {
            setStockItemDisplay(viewStockItem);
            setOpenState(true);
            setLoading(false);
        }
    }, [viewStockItem]);

    useEffect(() => {
        const fetchStockQuote = async (inputStock: StockInfo) => {
            try {
                if (inputStock?.symbol && inputStock.currency && inputStock.exchangeShortName) {
                    const selectedStockQuote: StockQuote = await fetchSelectedStockQuote(inputStock)
                    const selectedPortfolio: StockItem = {
                        symbol: selectedStockQuote.symbol,
                        name: inputStock.name,
                        price: selectedStockQuote.price,
                        volume: selectedStockQuote.volume,
                        currency: inputStock.currency,
                        exchange: inputStock.exchangeShortName,
                        lastUpdated: new Date()
                    }
                    
                    setStockItemDisplay(selectedPortfolio)
    
                    setOpenState(true);
                    setLoading(false);
                } else {
                    onError('Unable to fetch stock due to not all required information are provided.');    
                }
            } catch (error: unknown) {
                let errorMsg = 'Unable to fetch stock quote.';
                const responseErrorMsg = error.response.data['Error Message'];
                if (responseErrorMsg && responseErrorMsg.includes('Free plan is limited to US stocks only')) {
                    errorMsg = 'Unable to fetch stock quote due to the API subscription plan.';
                }
                onError(errorMsg);
            }
        }

        if (selectedStock) {
            fetchStockQuote(selectedStock.value).catch(console.error);
        }
    }, [selectedStock]);

    const addToPortfolio = async () => {
        try {
            setAddToPortfolioBtnLoading(true);
            if (stockItemDisplay) {
                const userId = getUserId();
                await addNewStockToPortfolio(userId, stockItemDisplay);
                onSuccess(`Stock ${stockItemDisplay.symbol} has been added to your portfolio.`);
            }
        } catch (error: unknown) {
            if (error.response?.data?.message?.includes('already existed')) {
                onWarning(`Stock symbol '${stockItemDisplay?.symbol}' already added to your portfolio.`)
            } else {
                onError('Unable to add stock to portfolio.');
                console.error(error);
            }
        } finally {
            setOpenState(false);
            setLoading(true);
            setAddToPortfolioBtnLoading(false);
        }
    };

    const DisplayLastUpdated = () => {
        if (showLastUpdated) {
            const lastUpdatedDate = new Date(stockItemDisplay?.lastUpdated);
            return (
                <Paragraph>
                    <Text italic>Last updated: {lastUpdatedDate.toLocaleString()}</Text>
                </Paragraph>
            );
        }
    }

    const DisplayAddToPortfolioBtn = () => {
        if (!showLastUpdated) {
            return (
                <Button type="primary" onClick={addToPortfolio} loading={addToPortfolioBtnLoading}>
                    Add to portfolio
                </Button>
            );
        }
    }

    return (
        <Modal
            title={<p>Stock Information</p>}
            footer={(_, { CancelBtn }) => (
                <>
                    <DisplayAddToPortfolioBtn />
                    <CancelBtn />
                </>
            )}
            loading={loading}
            open={openState}
            onCancel={() => {
                setOpenState(false);
                setLoading(true);
            }}
        >
            <Title>{stockItemDisplay?.symbol}</Title>
            <Row>
                <Col span={12}><Statistic title={stockItemDisplay?.name} value={stockItemDisplay?.price} precision={2} suffix={stockItemDisplay?.currency} /></Col>
                <Col span={12}><Statistic title="Volume" value={stockItemDisplay?.volume} precision={2} /></Col>
            </Row>
            <DisplayLastUpdated/>
        </Modal>
    );
}