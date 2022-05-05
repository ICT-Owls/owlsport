import WebSocket, { WebSocketServer } from 'ws';
import queryString from 'query-string';

export default async (expressServer) => {
    const websocketServer = new WebSocketServer({
        noServer: true,
        path: '/websockets',
    });

    expressServer.on('upgrade', (request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
            websocketServer.emit('connection', websocket, request);
        });
    });

    websocketServer.on(
        'connection',
        function connection(websocketConnection, connectionRequest) {
            const [_path, params] = connectionRequest?.url?.split('?');
            const connectionParams = queryString.parse(params);

            // NOTE: connectParams are not used here but good to understand how to get
            // to them if you need to pass data with the connection to identify it (e.g., a userId).
            console.log(connectionParams);

            websocketConnection.on('message', (message) => {
                const parsedMessage = JSON.parse(message);
                console.log(parsedMessage);
                websocketConnection.send(JSON.stringify({ message: 'testestestest' }));
            });

            websocketConnection.on('error', (error) => {
                console.log(error);
            });


            websocketConnection.on('open', (e) => {
                console.log("opened!");
            });

        }
    );

    return websocketServer;
};
