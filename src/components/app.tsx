import * as React from 'react';
import {ReadyState} from "react-use-websocket";
import {Container, Row} from 'react-grid-system'

import {Unready} from "./unready";
import {PriceSize} from "../types";
import {parseData, filterItemsWithNoSize, useApiData} from "../utils";

import '../styles.css';
import {DataColumn} from "./dataColumn";

export const App = () => {
  const [bids, setBids] = React.useState<PriceSize>([])
  const [asks, setAsks] = React.useState<PriceSize>([])

  const { lastMessage, readyState, } = useApiData()

  React.useEffect(() => {
    const data = parseData(lastMessage?.data)

    if (!data) {
      return
    }

    if (data?.bids?.length > 0) {
      setBids(data.bids.filter(filterItemsWithNoSize))
    }

    if (data?.asks?.length > 0) {
      setAsks(data.asks.filter(filterItemsWithNoSize))
    }
  }, [lastMessage])

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
