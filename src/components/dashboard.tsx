import React, {useEffect, useState} from 'react';
import {IgrFinancialChart, IgrFinancialChartModule} from 'igniteui-react-charts';
import {NotificationType, StockItem} from "../types";
import {DAILY_TIME_SERIES, INTRA_DAY_TIME_SERIES, MONTHLY_TIME_SERIES, WEEKLY_TIME_SERIES} from "../constants";
import {getTimeSeriesDaily, getTimeSeriesIntraDay, getTimeSeriesMonthly, getTimeSeriesWeekly} from "../services";
import {convertData} from "../dataTransformer";
import {notification, Radio, RadioChangeEvent, Typography} from 'antd';

const {Title} = Typography;
IgrFinancialChartModule.register();

export default function Dashboard({symbolList}: { symbolList: string[] }) {

    const [stockData, setStockData] = useState<StockItem[][]>([]);
    const [selectedTimeSeries, setSelectedTimeSeries] = useState<string>(INTRA_DAY_TIME_SERIES);
    const timeSeriesOptions = [
        {label: 'Intra Day', value: INTRA_DAY_TIME_SERIES},
        {label: 'Daily', value: DAILY_TIME_SERIES},
        {label: 'Weekly', value: WEEKLY_TIME_SERIES},
        {label: 'Monthly', value: MONTHLY_TIME_SERIES},
    ];

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message,
            description,
        });
    };

    const onTimeSeriesTypeChange = ({target: {value}}: RadioChangeEvent) => {
        setSelectedTimeSeries(value);
    };

    useEffect(() => {
        if (symbolList.length > 0) {

            let functionToCall: Function = getTimeSeriesDaily;

            switch (selectedTimeSeries) {
                case INTRA_DAY_TIME_SERIES : {
                    functionToCall = getTimeSeriesIntraDay
                    break;
                }
                case DAILY_TIME_SERIES : {
                    functionToCall = getTimeSeriesDaily
                    break;
                }
                case WEEKLY_TIME_SERIES : {
                    functionToCall = getTimeSeriesWeekly
                    break;
                }
                case MONTHLY_TIME_SERIES : {
                    functionToCall = getTimeSeriesMonthly
                    break;
                }
            }

            let listOfPromises = symbolList.map(symbol => functionToCall(symbol));

            Promise.allSettled([...listOfPromises]).then((result : any) => {
                if (!result[0]['value']['Meta Data']) {
                    openNotificationWithIcon('warning', 'Too Many Requests', result.message);
                } else {
                    let convertedData: StockItem[][] = result.map(timeSeries => {
                        let data = convertData(timeSeries['value'][selectedTimeSeries]);
                        (data as any).__dataIntents = {
                            close: [`"SeriesTitle/${timeSeries?.['value']?.['Meta Data']?.['2. Symbol']}"`]
                        };

                        return data;
                    });
                    setStockData(convertedData);
                }

            }).catch((error: any) => {
                console.log(error);
                openNotificationWithIcon('error', 'Operation Failed', error.message);
            });
        }
    }, [symbolList, selectedTimeSeries]);

    return (
        <div className="container sample">
            {contextHolder}

            <Title>My Dashboard</Title>

            <Title level={4}>{symbolList.map(symbol => `${symbol} `)}</Title>

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
                dataSource={stockData}/>
        </div>
    );
}

