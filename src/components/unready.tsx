import * as React from 'react'
import '../styles.css'
import {ReadyState} from "react-use-websocket";
import {getUnreadyMessage} from "../utils";
import {testIds} from "../constants";

type Props = {
    readyState: ReadyState
}

export const Unready = ({readyState}:Props) =>
    <div className="unready" data-testid={testIds.unready}>{getUnreadyMessage(readyState)}</div>

