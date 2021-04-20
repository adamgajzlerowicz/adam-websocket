import * as React from 'react'
import '../styles.css'
import {ReadyState} from "react-use-websocket";
import {getUnreadyMessage} from "../utils";

type Props = {
    readyState: ReadyState
}

export const Unready = ({readyState}:Props) =>
    <div className="unready">{getUnreadyMessage(readyState)}</div>

