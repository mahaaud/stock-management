import { Modal, Button, Typography  } from "antd";
import { useEffect, useState } from "react";
import { fetchSelectedStockQuote } from "../services/stock.service";
const { Title, Paragraph } = Typography;

export function StockInformationModal({ selectedStock }: any): any {

    const [openState, setOpenState] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stockPortfolioDisplay, setStockPortfolioDisplay] = useState<Portfolio>();

    useEffect(() => {
        const fetchStockQuote = async (inputStock: StockItem) => {
            if (inputStock?.symbol) {
                const selectedStockQuote: StockQuote = await fetchSelectedStockQuote(inputStock)
                const selectedPortfolio: Portfolio = {
                    symbol: selectedStockQuote.symbol,
                    name: inputStock.name,
                    price: selectedStockQuote.price,
                    volume: selectedStockQuote.volume,
                    currency: inputStock.currency,
                    exchange: inputStock.exchangeShortName
                }
                
                setStockPortfolioDisplay(selectedPortfolio)

                setOpenState(true);
                setLoading(false);
            }
        }

        if (selectedStock) {
            fetchStockQuote(selectedStock.value).catch(console.error);
        }
    }, [selectedStock]);

    const addToPortfolio = () => {
        
    };

    return (
        <Modal
            title={<p>Stock Information</p>}
            footer={(_, { CancelBtn }) => (
                <>
                    <Button type="primary" onClick={addToPortfolio}>
                        Add to portfolio
                    </Button>
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
            <Title>{stockPortfolioDisplay?.symbol}</Title>
            <Paragraph>Stock name: {stockPortfolioDisplay?.name}</Paragraph>
            <Paragraph>Price: {stockPortfolioDisplay?.price} {stockPortfolioDisplay?.currency}</Paragraph>
            <Paragraph>Volume: {stockPortfolioDisplay?.volume}</Paragraph>
        </Modal>
    );
}