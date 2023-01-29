export type TickerSymbol = {
    "1. symbol" : string;
    "2. name": string;
    "3. type": string;
    "4. region": string;
    "5. marketOpen": string;
    "6. marketClose": string;
    "7. timeZone": string;
    "8. currency": string;
    "9. matchScore": string;
};

export type MetaData = {
    "1. Information" :string;
    "2. Symbol" : string;
    "3. Last Refreshed" : string;
    "4. Output Size"? : string;
    "5. Time Zone" : string;
};

export type TimeSeriesEntry = {
    [key:string] : {
        "1. open": string;
        "2. high": string;
        "3. low": string;
        "4. close": string;
        "5. volume": string;
    }
};

export type SearchTickerSymbolResponse = {
    bestMatches : TickerSymbol[]
}

export type DailyTimeSeriesResponse = {
    'Meta Data' : MetaData;
    'Time Series (Daily)' : {TimeSeriesEntry}
}

export type WeeklyTimeSeriesResponse = {
    'Meta Data' : MetaData;
    'Weekly Time Series' : {TimeSeriesEntry}
}

export type MonthlyTimeSeriesResponse = {
    'Meta Data' : MetaData;
    'Monthly Time Series' : {TimeSeriesEntry}
}

export type TimeSeriesData = DailyTimeSeriesResponse | WeeklyTimeSeriesResponse | MonthlyTimeSeriesResponse;

export type PickListOption = { value: string; label: string };

export type StockItem = {
    Open?: number;
    Close?: number;
    High?: number;
    Low?: number;
    Volume?: number;
    Date?: Date;
}