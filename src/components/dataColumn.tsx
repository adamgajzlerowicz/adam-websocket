import * as React from 'react'
import {Col, Row} from "react-grid-system";
import {OrderbookItem} from "./orderbookItem";
import {calculateTotal} from "../utils";
import {PriceSize} from "../types";

type Props = {
    data: PriceSize
    heading: string
}

export const DataColumn = ({data, heading}: Props) => {
    return <Col xs={12} lg={6}>
        <h3>{heading}</h3>
        <Row>
            <Col>Price</Col>
            <Col>Size</Col>
            <Col>Total</Col>
        </Row>
        {data.map((item, index) =>
            <OrderbookItem
                key={index}
                prize={item[0]}
                size={item[1]}
                total={calculateTotal(data.slice(index, data.length))}
            />)
        }
    </Col>
}

