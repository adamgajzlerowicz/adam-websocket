import * as React from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {Col, Container, Row} from 'react-grid-system'

import '../styles.css';
import {Unready} from "./Unready";
import {ApiData} from "../types";
import {OrderbookItem} from "./orderbookItem";

const getDataMessage = {"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]}


const parseApiData = (data: string): ApiData | null => {
  try {
    return JSON.parse(data)
  } catch(e) {
    return null
  }
}

const calculateTotal = (data: ApiData['bids']) => data.reduce((acc, item) => acc + item[0], 0)

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
      <Container className="orderbook">
          <Row>
            <Col>Price</Col>
            <Col>Size</Col>
            <Col>Total</Col>
          </Row>

            {bids.map((item, index) =>
                <OrderbookItem
                    key={index}
                    prize={item[0]}
                    size={item[1]}
                    total={calculateTotal(bids.slice(index, bids.length))}
                />)
            }
      </Container>
  );
}
