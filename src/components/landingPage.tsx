import React, {useState} from 'react';
import {AutoComplete, Button, Col, Divider, Input, List, Row, Tooltip, Typography} from 'antd';
import StockChart from "./stockChart";
import {PickListOption, SearchTickerSymbolResponse, TickerSymbol} from "../types";
import {searchTickerSymbol} from "../services";
import './LandingPage.css';
import {DeleteOutlined, StarOutlined} from '@ant-design/icons';

const {Title, Text} = Typography;


export default function LandingPage() {

    const [symbolList, setSymbolList] = useState<TickerSymbol[]>([]);
    const [options, setOptions] = useState<PickListOption[]>([]);
    const [symbolData, setSymbolData] = useState<TickerSymbol>();

    const handleSearch = (value: string) => {
        if (value.length >= 2) {
            searchTickerSymbol(value).then(
                (result: SearchTickerSymbolResponse) =>
                    setOptions(result.bestMatches.map(tickerSymbol => ({
                        value: tickerSymbol['1. symbol'],
                        label: `${tickerSymbol['2. name']}(${tickerSymbol['1. symbol']})`
                    })))
            ).catch(
                (error: any) => console.log(error)
            );
        }
    };

    const onSelect = (value: string) => {
        searchTickerSymbol(value).then(
            (result: SearchTickerSymbolResponse) =>
                setSymbolData(result.bestMatches[0])
        ).catch(
            (error: any) => console.log(error)
        );
    };

    const addToFavorite = (value) => {
        setSymbolList([...symbolList, value]);
    }

    const removeFromFavorite = (value) => {
        setSymbolList([...symbolList.filter(item => item !== value)]);
    }

    return <>
        <Row>
            <Col span={4}>
                <Row>
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
                                <Button type="link" onClick={() => onSelect(item['1. symbol'])}>{item['2. name']}({item['1. symbol']})</Button>
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
            {symbolData && <Col span={8} style={{padding: '50px'}}>

                <div style={{float: "right"}}>
                    <Button icon={<StarOutlined/>}
                            onClick={() => addToFavorite(symbolData)}> Favorite </Button>
                </div>
                <div>
                    <Title>{symbolData?.['2. name']}</Title>
                    <Text>Ticker Symbol : {symbolData?.['1. symbol']}<Divider type="vertical"/>Currency
                        : {symbolData?.['8. currency']} <Divider type="vertical"/>Region : {symbolData?.['4. region']}
                    </Text>
                </div>
                <div style={{paddingTop: '20px'}}>
                    <StockChart
                        symbol={symbolData?.['1. symbol']}
                    />
                </div>
            </Col>}
        </Row>
    </>;
}