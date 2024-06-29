import axios from 'axios';
import PubSubManager from './PubSubManager';
import express from 'express';
import cron from 'node-cron';
import dotenv from "dotenv";
dotenv.config();

const STOCK_API_URL = process.env.STOCK_API_URL;
const STOCK_API_KEY = process.env.STOCK_API_KEY;

const app = express();

const PORT = 4000;
const stockList = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'NVDA', 'PYPL'];


const publishStockPrice = async (symbols: string[]) => {
    
    try {
        const symbolString = symbols.join(',');
        const url = `${STOCK_API_URL}time_series?symbol=${symbolString}&interval=1min&apikey=${STOCK_API_KEY}`;
        const response = await axios.get(url);
        
        for (const symbol of symbols) { 
            PubSubManager.addDataToCache(symbol, response.data[symbol].values);
            PubSubManager.publish(symbol, response.data[symbol].values);
           
        }
    }
    catch (error) {
        console.error(`Error fetching stock price: ${error}`);
    }
}

console.log('Running cron job immediately');
publishStockPrice(stockList);

cron.schedule('*/5 * * * *', () => {
    console.log('Running cron job after 5 minute');
    publishStockPrice(stockList);
});


 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})

