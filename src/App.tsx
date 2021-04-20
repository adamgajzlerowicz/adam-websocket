import * as React from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";

import './App.css';
import {Unready} from "./components/Unready";

const getDataMessage = {"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]}

type ApiData = {
  feed: string,
  product_id: string,
  bids: Array<[number, number]>
  asks: Array<[number, number]>
}

const parseApiData = (data: string): ApiData | null => {
  try{
    return JSON.parse(data)
  }catch(e) {
    return null
  }
}

export const App = () => {
  const [socketUrl] = React.useState('wss://www.cryptofacilities.com/ws/v1');

  const {
    sendJsonMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl, { onOpen: () => {
      sendJsonMessage(getDataMessage)
    }});

  if (readyState !== ReadyState.OPEN) {
    return <Unready readyState={readyState} />
  }

  const data = parseApiData(lastMessage?.data)

  return (
      <div className="page">
          <div className="orderbook">
            <div className="orderbook-item">Price</div>
            <div className="orderbook-item">Size</div>
            <div className="orderbook-item">Total</div>
            {data?.bids?.map(item => {

              return <>
                <div className="orderbook-item">{item[0]}</div>
                <div className="orderbook-item">{item[1]}</div>
                <div className="orderbook-item">{item[1]}</div>
              </>
            })}
          </div>
      </div>
  );
}
