# Redux Websocket Middleware [![npm version](https://img.shields.io/npm/v/redux-ws-middleware.svg?style=flat)](https://www.npmjs.com/package/redux-ws-middleware)
A WebSocket middleware for [Redux](https://redux.js.org/).

## Installation
``` 
npm install redux-ws-middleware 
```
## Configuration
First, configure your Redux store to use the middleware with `applyMiddleware`.

```js
import { createStore, applyMiddleware } from 'redux';
import { websocketMiddleware, configureWebsocket } from 'redux-ws-middleware';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(websocketMiddleware));
```

Then, customize the websocketMiddleware by passing options into `configureWebsocket`.

```js

configureWebsocket(options);

```
#### Available options
```js
interface MiddlewareConfig {
    //The URL to which to connect.
    url: string,
    // Either a single protocol string or an array of protocol strings.
    protocols?: Array|string,
    // Functions for WebSocket event listeners.
    onOpen?: (event: Event, socket: WebSocket, store) => void,
    onMessage?: (event: MessageEvent, socket: WebSocket, store) => void,
    onError?: (event: MessageEvent, socket: WebSocket, store) => void,
    onClose?: (event: CloseEvent, socket: WebSocket, store) => void,
    // Functions for middleware actions.
    onMiddlewareConnect?: (action: Object, socket: WebSocket, store) => void,
    onMiddlewareMessage?: (action: Object, socket: WebSocket, store) => void,
    onMiddlewareError?: (action: Object, socket: WebSocket, store) => void,
    onMiddlewareClose?: (action: Object, socket: WebSocket, store) => void,
    // Whether or not to reconnect when a WebSocket connection closes. False by default.
    reconnect?: boolean,
    // Ammount, in milliseconds, before attempting to reconnect.
    reconnectInterval?: number    
}
```
## Usage
You can dispatch these actions:

---

##### WEBSOCKET_CONNECT
By default, dispatches when a WebSocket connection opens.
###### Structure
``` js
{
    type: 'WEBSOCKET_CONNECT',
    event: {},
}
```
---

##### WEBSOCKET_MESSAGE
By default, dispatches when the WebSocket receives a message.
###### Structure
``` js
{
    type: 'WEBSOCKET_MESSAGE',
    event: {},
}
```
---

##### WEBSOCKET_ERROR
By default, dispatches when a WebSocket error occurs.
###### Structure
``` js
{
    type: 'WEBSOCKET_ERROR',
    error: {},
}
```
---

##### WEBSOCKET_DISCONNECT
By default, dispatches when the WebSocket connection closes.
###### Structure
``` js
{
    type: 'WEBSOCKET_DISCONNECT',
    event: {},
}
```
