import React from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Typography, Breadcrumb, Space } from 'antd';
import portfolioStore from '../../stores/portfolio.store';
import { DesignConstant } from '../constants/design.constant';
import { HomeOutlined } from '@ant-design/icons';

const { Title, Link } = Typography;

const PortfolioPage = observer(() => {
    const columns = [
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Total Value',
            render: (_: any, record: { quantity: number; price: number; }) => record.quantity * record.price,
        },
    ];

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: DesignConstant.CSS_HTML_INNER,
                }}
            />
            <div className="wrapper">
                <div className="container">
                    <div id="welcome">
                        <Title>
                            <span> Here is your beloved, </span>
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
                                title: 'Your Portfolio',
                            },
                        ]}
                    />
                    <Table dataSource={portfolioStore.portfolio} columns={columns} />
                </div>
                <div className="container">
                    <Space align="start">
                        <Link href="/">Back to Home</Link>
                    </Space>
                </div>
            </div>
        </>
    );
});

export default PortfolioPage;