import * as React from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";

import './App.css';
import {Unready} from "./components/Unready";
import {ApiData} from "./types";
import {OrderbookItem} from "./components/orderbookItem";

const getDataMessage = {"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]}


const parseApiData = (data: string): ApiData | null => {
  try {
    return JSON.parse(data)
  } catch(e) {
    return null
  }
}

export const App = () => {
  const [socketUrl] = React.useState('wss://www.cryptofacilities.com/ws/v1');
  const [bids, setBids] = React.useState<ApiData['bids']>([])

  const {
    sendJsonMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl, { onOpen: () => {
      sendJsonMessage(getDataMessage)
    }});

  React.useEffect(() => {
    const data = parseApiData(lastMessage?.data)

    if (!data || !data.bids || data?.bids?.length === 0) {
      return
    }

    setBids(data.bids)
  }, [setBids, lastMessage])

  if (readyState !== ReadyState.OPEN) {
    return <Unready readyState={readyState} />
  }

  return (
      <div className="orderbook">
          <div className="grid">
            <div className="orderbook-item">Price</div>
            <div className="orderbook-item">Size</div>
            <div className="orderbook-item">Total</div>
            {bids.map((item, index) =>
                <OrderbookItem key={index} prize={item[0]} size={item[1]} total={200} />)
            }
          </div>
      </div>
  );
}
