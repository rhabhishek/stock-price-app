import {StockItem, TimeSeriesEntry} from "./types";

export const convertData = (timeSeriesEntries: TimeSeriesEntry): StockItem[] => {
    let stockItems: StockItem[] = [];

    for (const date in timeSeriesEntries) {

        let item : StockItem = {
            Date : new Date(date),
            Open : Number(timeSeriesEntries[date]["1. open"]),
            High : Number(timeSeriesEntries[date]["2. high"]),
            Low : Number(timeSeriesEntries[date]["3. low"]),
            Close : Number(timeSeriesEntries[date]["4. close"]),
            Volume : Number(timeSeriesEntries[date]["5. volume"]),
        }

        stockItems.push(item);

    }

    return stockItems;
}