import {ApiData} from "./types";

export const parseApiData = (data: string): ApiData | null => {
    try {
        return JSON.parse(data)
    } catch(e) {
        return null
    }
}

export const calculateTotal = (data: ApiData['bids']) => data.reduce((acc, item) => acc + item[0], 0)

export const filterItemsWithNoTotal = (data: [number, number]) => {
    return data[1] > 0
}
