import React, {useEffect, useState} from 'react';
import {IgrFinancialChart, IgrFinancialChartModule} from 'igniteui-react-charts';
import {TimeSeriesData} from "../types";
import {DAILY_TIME_SERIES, MONTHLY_TIME_SERIES, WEEKLY_TIME_SERIES} from "../constants";
import {getTimeSeriesDaily, getTimeSeriesMonthly, getTimeSeriesWeekly} from "../services";
import {convertData} from "../dataTransformer";
import {Radio, RadioChangeEvent} from 'antd';

IgrFinancialChartModule.register();

export default function StockChart({symbol}: { symbol?: string }) {
    const [stockData, setStockData] = useState<TimeSeriesData | {}>({});
    const [selectedTimeSeries, setSelectedTimeSeries] = useState<string>(DAILY_TIME_SERIES);
    const timeSeriesOptions = [
        {label: 'Daily', value: DAILY_TIME_SERIES},
        {label: 'Weekly', value: WEEKLY_TIME_SERIES},
        {label: 'Monthly', value: MONTHLY_TIME_SERIES},
    ];

    const onTimeSeriesTypeChange = ({target: {value}}: RadioChangeEvent) => {
        setSelectedTimeSeries(value);
    };
    useEffect(() => {
        if (symbol?.length) {

            switch (selectedTimeSeries) {
                case DAILY_TIME_SERIES : {
                    getTimeSeriesDaily(symbol).then((result: TimeSeriesData) => {
                        setStockData(result);
                    }).catch((error: any) => console.log(error));
                    break;
                }
                case WEEKLY_TIME_SERIES : {
                    getTimeSeriesWeekly(symbol).then((result: TimeSeriesData) => {
                        setStockData(result);
                    }).catch((error: any) => console.log(error));
                    break;
                }
                case MONTHLY_TIME_SERIES : {
                    getTimeSeriesMonthly(symbol).then((result: TimeSeriesData) => {
                        setStockData(result);
                    }).catch((error: any) => console.log(error));
                    break;
                }
            }
        }
    }, [symbol, selectedTimeSeries]);

    return (
        <div className="container sample">
            <div style={{padding: '10px'}}>
                <Radio.Group options={timeSeriesOptions} onChange={onTimeSeriesTypeChange}
                             value={selectedTimeSeries} optionType="button"/>
            </div>
            <IgrFinancialChart
                width="100%"
                height="100%"
                chartType="Line"
                thickness={2}
                chartTitle={stockData?.['Meta Data']?.['1. Information']}
                yAxisMode="Numeric"
                yAxisTitle="Price"
                zoomSliderType="Line"
                dataSource={convertData(stockData[selectedTimeSeries])}/>
        </div>
    );
}

