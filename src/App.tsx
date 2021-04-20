import * as React from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";

import './App.css';

const getDataMessage = {"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]}

type ApiData = {}

const parseApiData = (data: string): ApiData | null => {
  try{
      return JSON.parse(data)
  }catch(e) {
    return null
  }
}

const App = () => {
  const [socketUrl] = React.useState('wss://www.cryptofacilities.com/ws/v1');

  const {
    sendJsonMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl, { onOpen: () => {
      sendJsonMessage(getDataMessage)
    }});

  if (readyState === ReadyState.CONNECTING) {
    return <div>loading</div>
  }

  if (readyState !== ReadyState.OPEN) {
    return <div>loading</div>
  }

  const data = parseApiData(lastMessage?.data)
  console.log(data);


  return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;
