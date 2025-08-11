import { useEffect } from 'react';
import useWebSocket from '../middleware/webSocketHook';

function Ws(){
  // use our hook
  const ws = useWebSocket({
    socketUrl : `ws://localhost:5000`
  });

  // receive messages
  useEffect(() => {
    if (ws.data) {
      return ws.data
    }
  }, [ws.data]);

  // send messages
  const sendData = (data) => {
    ws.send(JSON.stringify(data))
  };
}

export default Ws;