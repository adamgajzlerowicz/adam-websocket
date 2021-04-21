import {calculateTotal, filterItemsWithNoSize, formatCurrency, formatSize, getUnreadyMessage, parseData} from "./utils";
import {ReadyState} from "react-use-websocket";

describe('getUnreadyMessage', () => {
    it('handles closed state', function () {
        expect(getUnreadyMessage(ReadyState.CLOSED)).toBe('No connection')
    });

    it('handles closing state', function () {
        expect(getUnreadyMessage(ReadyState.CLOSING)).toBe('Connection closing')
    });

    it('handles connecting state', function () {
        expect(getUnreadyMessage(ReadyState.CONNECTING)).toBe('Loading')
    });
})

describe('parseApiData', () => {
    it('returns null given malformed payload', () => {
        expect(parseData('not-a-json')).toBe(null)
    })

    it('returns parsed data', () => {
        const data = { hello: 'world'}
        expect(parseData(JSON.stringify(data))).toEqual(data)
    })
})

describe('calculateTotal', () => {
    it('calculates for an empty array', ()=> {
        expect(calculateTotal([])).toBe(0)
    })

    it('calculates for real data', ()=> {
        expect(calculateTotal([[1, 2], [2, 3], [3, 4]])).toBe(9)
    })
})

describe('filterItemsWithNoSize', () => {
   it('returns true if item has size', () => {
       expect(filterItemsWithNoSize([0, 1])).toEqual(true)
   })
    it('returns false if item has no size', () => {
        expect(filterItemsWithNoSize([0, 0])).toEqual(false)
    })
});

describe('formatCurrency', () => {
    it('formats currency correctly', () => {
        expect(formatCurrency(5000)).toBe('$5,000.00')
        expect(formatCurrency(5000.5)).toBe('$5,000.50')
    })
})

describe('formatSize', () => {
    it('formats size correctly', () => {
        expect(formatSize(500.5)).toBe('500.500')
        expect(formatSize(.5)).toBe('0.500')
    })
})
