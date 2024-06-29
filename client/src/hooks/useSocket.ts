import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../dataSlice";
const stocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'NVDA', 'PYPL', 'ADBE', 'INTC']


const useSocket = (url: string) => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const ws = new WebSocket(url);
        ws.onopen = () => {
            console.log('Connected to server');
         
            for (const stock of stocks) {
                ws.send(JSON.stringify({ payload: stock, action: 'subscribe' }));
            }
        }


        ws.onmessage = (event) => {
            dispatch(setData(JSON.parse(event.data)));
            setLoading(false);
        }

        ws.onclose = () => {
            console.log('Disconnected from server');
            
        }
        
        setInterval(() => {
            ws.send(JSON.stringify({ type: 'keep-alive', timestamp: Date.now() }));
          }, 30000);

        return () => {
            ws.close();
        }
    }, [url]);

    return {  loading };
}

export default useSocket;