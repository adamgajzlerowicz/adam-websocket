import React from 'react'
import {Col, Row} from "react-grid-system";

type Props = {
   prize: number
   size: number
   total: number
}

export const OrderbookItem = ({prize, size, total}: Props) => {
   return <Row>
      <Col>{prize}</Col>
      <Col>{size}</Col>
      <Col>{total}</Col>
   </Row>
}
