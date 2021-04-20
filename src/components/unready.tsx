import * as React from 'react'
import '../styles.css'
import {ReadyState} from "react-use-websocket";

const getUnreadyMessage = (readyState: ReadyState) => {
    if (readyState === ReadyState.CONNECTING) {
        return 'Loading'
    }

    if (ReadyState.CLOSING === readyState) {
        return 'Connection closing'
    }

    return 'No connection'

}

type Props = {
    readyState: ReadyState
}

export const Unready = ({readyState}:Props)=> {
    return <div className="unready">{getUnreadyMessage(readyState)}</div>
}
