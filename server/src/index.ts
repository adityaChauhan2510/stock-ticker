import WebSocket from "ws";
import http from "http";
import PubSubManager from "./PubSubManager";




const server = http.createServer((req, res) => {
    console.log(req.url)
    res.end('okay');
});
const wss = new WebSocket.Server({ server });

const pubSubManager = PubSubManager
try {
    wss.on("connection", (ws) => {
        ws.on("message", (message) => {
            console.log(`Received message => ${message}`);
            
            const parsedMessage = JSON.parse(message.toString());
            if (parsedMessage.action === 'subscribe') {
                pubSubManager.addUser(parsedMessage.payload, ws);
                pubSubManager.sendDataFromCache(parsedMessage.payload, ws);
            }


        });

        ws.on("close", () => {
            console.log("Client disconnected");
        });
        
    });
}
catch (error) {
    console.error(`Error creating WebSocket server: ${error}`);
}

server.listen(8080, () => {  
    console.log(`Server is running at http://localhost:8080`);
})