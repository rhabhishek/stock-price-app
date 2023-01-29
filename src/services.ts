import {
    DailyTimeSeriesResponse,
    MonthlyTimeSeriesResponse,
    SearchTickerSymbolResponse,
    WeeklyTimeSeriesResponse
} from "./types";
import {RAPID_API_KEY} from "./constants";

const baseURL = 'https://alpha-vantage.p.rapidapi.com/';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
    }
};


export const searchTickerSymbol = (keyword: string): Promise<SearchTickerSymbolResponse> => {
    return fetch(`${baseURL}query?function=SYMBOL_SEARCH&keywords=${keyword}&datatype=json`, options)
        .then(response => response.json());
}

export const getTimeSeriesDaily = (symbol: string): Promise<DailyTimeSeriesResponse> => {
    return fetch(`${baseURL}query?function=TIME_SERIES_DAILY&symbol=${symbol}&datatype=json`, options)
        .then(response => response.json());
}

export const getTimeSeriesWeekly = (symbol: string): Promise<WeeklyTimeSeriesResponse> => {
    return fetch(`${baseURL}query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&datatype=json`, options)
        .then(response => response.json());
}

export const getTimeSeriesMonthly = (symbol: string): Promise<MonthlyTimeSeriesResponse> => {
    return fetch(`${baseURL}query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&datatype=json`, options)
        .then(response => response.json());
}



