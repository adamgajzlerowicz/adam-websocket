import React from 'react'
import {Col, Row} from "react-grid-system";
import {formatCurrency, formatSize} from "../utils";
import {testIds} from "../constants";

type Props = {
   price: number
   size: number
   total: number
}

export const OrderbookItem = ({price, size, total}: Props) =>
    <Row>
       <Col data-testid={testIds.orderbookPrice}>{formatCurrency(price)}</Col>
       <Col data-testid={testIds.orderbookSize}>{formatSize(size)}</Col>
       <Col data-testid={testIds.orderbookTotal}>{formatSize(total)}</Col>
    </Row>
