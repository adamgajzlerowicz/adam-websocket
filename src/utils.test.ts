import {calculateTotal, getUnreadyMessage, parseData} from "./utils";
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
