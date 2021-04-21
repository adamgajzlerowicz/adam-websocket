import * as React from 'react'
import {Col, Row} from "react-grid-system";
import {OrderbookItem} from "./orderbookItem";
import {calculateTotal} from "../utils";
import {PriceSize} from "../types";
import {testIds} from "../constants";

type Props = {
    data: PriceSize
    heading: string
}

export const DataColumn = ({data, heading}: Props) => {
    return <Col xs={12} lg={6}>
        <h3 data-testid={testIds.dataColumnHeading}>{heading}</h3>
        <Row>
            <Col data-testid={testIds.priceHeading}>Price</Col>
            <Col data-testid={testIds.sizeHeading}>Size</Col>
            <Col data-testid={testIds.totalHeading}>Total</Col>
        </Row>
        {data.map((item, index) =>
            <OrderbookItem
                key={index}
                price={item[0]}
                size={item[1]}
                total={calculateTotal(data.slice(index, data.length))}
            />)
        }
    </Col>
}

