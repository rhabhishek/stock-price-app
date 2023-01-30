import React, {useState} from 'react';
import {AutoComplete, Button, Col, Divider, Input, List, notification, Row, Tooltip, Typography} from 'antd';
import StockChart from "./stockChart";
import Dashboard from "./dashboard";
import {NotificationType, PickListOption, TickerSymbol} from "../types";
import {searchTickerSymbol} from "../services";
import './LandingPage.css';
import {DashboardOutlined, DeleteOutlined, StarFilled, StarOutlined} from '@ant-design/icons';
import {DEMO_FAVORITE_LIST} from "../constants";

const {Title, Text} = Typography;


export default function LandingPage() {

    const [symbolList, setSymbolList] = useState<TickerSymbol[]>(DEMO_FAVORITE_LIST);
    const [options, setOptions] = useState<PickListOption[]>([]);
    const [symbolData, setSymbolData] = useState<TickerSymbol | null>(null);

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message,
            description,
        });
    };

    const handleSearch = (value: string) => {
        if (value.length >= 2) {
            searchTickerSymbol(value).then(
                (result: any) => {
                    console.log(result)
                    if (!result.bestMatches) {
                        openNotificationWithIcon('warning', 'Too Many Requests', result.message);
                    } else {
                        setOptions(result.bestMatches.map(tickerSymbol => ({
                            value: tickerSymbol['1. symbol'],
                            label: `${tickerSymbol['2. name']}(${tickerSymbol['1. symbol']})`
                        })))
                    }
                }
            ).catch(
                (error: any) => {
                    console.log(error);
                    openNotificationWithIcon('error', 'Operation Failed', error.message);
                }
            );
        }
    };

    const onSelect = (value: string) => {
        searchTickerSymbol(value).then(
            (result: any) => {
                if (!result.bestMatches) {
                    openNotificationWithIcon('warning', 'Too Many Requests', result.message);
                } else {
                    setSymbolData(result?.bestMatches[0]);
                }
            }
        ).catch(
            (error: any) => {
                console.log(error);
                openNotificationWithIcon('error', 'Operation Failed', error.message);
            }
        );
    };

    const addToFavorite = (value) => {
        setSymbolList([...symbolList.filter(item => item['1. symbol'] !== value['1. symbol']), value]);
    }

    const removeFromFavorite = (value) => {
        setSymbolList([...symbolList.filter(item => item['1. symbol'] !== value['1. symbol'])]);
    }

    const isFavorite = (value) => {
        return value && !(symbolList.filter(item => item['1. symbol'] === value?.['1. symbol'])).length;
    }

    const goToDashboard = () => setSymbolData(null);

    return <>
        {contextHolder}
        {(symbolData || symbolList.length) && <Row>
            <Col span={6}>
                <Row>
                    <Divider orientation="left">Search Stock</Divider>
                    <AutoComplete
                        dropdownMatchSelectWidth={252}
                        style={{width: 300}}
                        options={options}
                        onSelect={onSelect}
                        onSearch={handleSearch}
                    >
                        <Input.Search size="large" placeholder="Search Ticker" enterButton/>
                    </AutoComplete>
                </Row>
                <Row>
                    <Divider orientation="left">Favorites</Divider>
                    <List
                        size="large"
                        dataSource={symbolList}
                        renderItem={(item) =>
                            <List.Item>
                                <Button type="link"
                                        onClick={() => onSelect(item['1. symbol'])}>{item['2. name']}({item['1. symbol']})</Button>
                                <Tooltip title="Remove Favorite" style={{float: 'right'}}>
                                    <Button type="text"
                                            onClick={() => removeFromFavorite(item)}><DeleteOutlined/></Button>
                                </Tooltip>
                            </List.Item>}
                        style={{width: "inherit"}}
                    />
                </Row>
            </Col>
            <Divider type="vertical" style={{height: "inherit"}}/>
            <Col span={17} style={{padding: '50px'}}>
                {symbolData ?
                    <>
                        <div style={{float: "left"}}>
                            <Button icon={<DashboardOutlined/>} size="small"
                                    onClick={() => goToDashboard()}> Go to Dashboard </Button>
                        </div>
                        <div style={{float: "right"}}>
                            {isFavorite(symbolData) ? <Button icon={<StarOutlined/>} type="primary" size="small"
                                                              onClick={() => addToFavorite(symbolData)}> Favorite </Button>
                                :
                                <Button icon={<StarFilled/>} size="small"
                                        onClick={() => removeFromFavorite(symbolData)}> Remove Favorite </Button>
                            }
                        </div>
                        <div>
                            <Title level={3}>{symbolData?.['2. name']}</Title>
                            <Text>Ticker Symbol : {symbolData?.['1. symbol']}<Divider type="vertical"/>Currency
                                : {symbolData?.['8. currency']} <Divider type="vertical"/>Region
                                : {symbolData?.['4. region']}
                            </Text>
                        </div>
                        <div style={{paddingTop: '20px'}}>
                            <StockChart
                                symbol={symbolData?.['1. symbol']}
                            />
                        </div>
                    </>
                    :
                    <div style={{paddingTop: '20px'}}>
                        <Dashboard
                            symbolList={symbolList.map(symbol => symbol['1. symbol'])}/>
                    </div>}
            </Col>
        </Row>}

        {!(symbolData || symbolList.length) && <Row style={{textAlign: "center"}}>
            <Col span={24}>
                <Title style={{fontSize: "xxx-large"}}>Welcome!</Title>
                <Title style={{fontSize: "large", fontWeight: "normal"}}>Start searching for a stock or a ticker symbol
                    to begin your journey</Title>
                <AutoComplete
                    dropdownMatchSelectWidth={252}
                    style={{width: 1000}}
                    options={options}
                    onSelect={onSelect}
                    onSearch={handleSearch}
                >
                    <Input.Search size="large" placeholder="Search Ticker" enterButton/>
                </AutoComplete>
            </Col>
        </Row>}
    </>;
}