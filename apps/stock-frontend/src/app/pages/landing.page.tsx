import { useState } from "react";
import { StockSearch } from "../components/search.component";
import { DesignConstant } from "../constants/design.constant";
import { StockOutlined } from '@ant-design/icons';
import { FloatButton, message, Typography, Row, Col } from "antd";
import { StockInformationModal } from "../components/modals/stockinformation.component";

const { Link } = Typography;

export function Landing() {
	const [selectedStockData, setSelectedStockData] = useState<StockInfo>();
	const [messageApi, contextHolder] = message.useMessage();

	const successMessage = (message: string) => {
		messageApi.open({
			type: 'success',
			content: message
		});
	}

	const warningMessage = (message: string) => {
		messageApi.open({
			type: 'warning',
			content: message
		});
	}

	const errorMessage = (message: string) => {
		messageApi.open({
			type: 'error',
			content: message
		})
	}

	const onSearchClickHandler = async (enteredData: StockInfo) => {
		try {
			setSelectedStockData(enteredData);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: DesignConstant.CSS_HTML_INNER,
				}}
			/>
			{contextHolder}
			<div className="wrapper">
				<div className="container">
					<div id="welcome">
						<h1>
							<span> Welcome to, </span>
							Stock Portfolio 📈
						</h1>
					</div>
				</div>
				<StockInformationModal selectedStock={selectedStockData} onSuccess={successMessage} onWarning={warningMessage} onError={errorMessage} />
				<div className="container">
					<StockSearch onSearchClicked={onSearchClickHandler} onError={errorMessage} />
				</div>
				<div className="container">
					<Row>
						<Col span={8}></Col>
						<Col span={8}>
							<Link href='/portfolio'>My Portfolio</Link>
						</Col>
						<Col span={8}></Col>
					</Row>
				</div>
				<FloatButton
					href="/portfolio"
					icon={<StockOutlined />}
					tooltip="Your Portfolio"
					style={{ insetInlineEnd: 164 }}
				/>
			</div>
		</>
	);
}

export default Landing;
