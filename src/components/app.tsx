import * as React from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {Container, Row} from 'react-grid-system'

import {Unready} from "./unready";
import {ApiData} from "../types";
import {parseData, filterItemsWithNoTotal} from "../utils";
import {getDataMessage, serviceUrl} from "../constants";

import '../styles.css';
import {DataColumn} from "./dataColumn";

export const App = () => {
  const [socketUrl] = React.useState(serviceUrl);
  const [bids, setBids] = React.useState<ApiData['bids']>([])
  const [asks, setAsks] = React.useState<ApiData['asks']>([])

  const {
    sendJsonMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl, { onOpen: () => {
      sendJsonMessage(getDataMessage)
    }});

  React.useEffect(() => {
    const data = parseData(lastMessage?.data)

    if (!data) {
      return
    }

    if (data.bids && data?.bids?.length > 0) {
      setBids(data.bids.filter(filterItemsWithNoTotal))
    }

    if (data.asks && data?.asks?.length > 0) {
      setAsks(data.asks.filter(filterItemsWithNoTotal))
    }

  }, [setBids, lastMessage])

  if (readyState !== ReadyState.OPEN) {
    return <Unready readyState={readyState} />
  }

  return (
      <Container>
        <Row className="data">
          <DataColumn data={bids} heading="Bids"/>
          <DataColumn data={asks} heading="Asks"/>
        </Row>

      </Container>
  );
}
