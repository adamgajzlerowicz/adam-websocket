import {ApiData} from "./types";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {getDataMessage, serviceUrl} from "./constants";

export const getUnreadyMessage = (readyState: ReadyState) => {
    if (readyState === ReadyState.CONNECTING) {
        return 'Loading'
    }

    if (ReadyState.CLOSING === readyState) {
        return 'Connection closing'
    }

    return 'No connection'
}

export const parseData = (data: string): ApiData | null => {
    try {
        return JSON.parse(data)
    } catch(e) {
        return null
    }
}

export const calculateTotal = (data: ApiData['bids']) => data.reduce((acc, item) => acc + item[1], 0)

export const filterItemsWithNoSize = (data: [number, number]) => data[1] > 0

export const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {style: 'currency',
    currency: 'USD',
}).format(amount);

export const formatSize = (size: number) => new Intl.NumberFormat('en', {
    style: "decimal",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
}).format(size).replace(/,/g,"");

export const useApiData = () => {
    const {
        sendJsonMessage,
        lastMessage,
        readyState,
    } = useWebSocket(serviceUrl, { onOpen: () => {
        sendJsonMessage(getDataMessage)
    }});

    return {
        lastMessage, readyState
    }
}
