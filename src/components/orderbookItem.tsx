import React from 'react'
import {Col, Row} from "react-grid-system";
import {formatCurrency, formatSize} from "../utils";

type Props = {
   price: number
   size: number
   total: number
}

export const OrderbookItem = ({price, size, total}: Props) => {
   return <Row>
      <Col>{formatCurrency(price * 100)}</Col>
      <Col>{formatSize(size)}</Col>
      <Col>{formatSize(total)}</Col>
   </Row>
}
