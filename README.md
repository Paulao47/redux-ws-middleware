# Redux Websocket Middleware [![npm version](https://img.shields.io/npm/v/redux-ws-middleware.svg?style=flat)](https://www.npmjs.com/package/redux-ws-middleware)
A WebSocket middleware for [Redux](https://redux.js.org/).

## Installation
``` 
npm install redux-ws-middleware 
```
## Configuration
First, initialize the websocketMiddleware by passing options into `initMiddleware`.

```js

import { initMiddleware } from 'redux-ws-middleware';
import options from './middlewareOptions';

initMiddleware(options);

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
    onMessageSend: (action: Object, socket: WebSocket, store) => void,
    onMiddlewareError?: (action: Object, socket: WebSocket, store) => void,
    onMiddlewareClose?: (action: Object, socket: WebSocket, store) => void,
    // Whether or not to reconnect when a WebSocket connection closes. False by default.
    reconnect?: boolean,
    // Ammount, in milliseconds, before attempting to reconnect.
    reconnectInterval?: number,
    // How many events to save in the Redux state. Unlimited (null) by default.
    limit?: number,
    // Name of the key in Redux state. Called 'events' by default.
    keyName?: string
}
```

Then, configure your Redux store to use the middleware with `applyMiddleware`.

```js
import { createStore, applyMiddleware } from 'redux';
import { websocketMiddleware, initMiddleware } from 'redux-ws-middleware';
import options from './middlewareOptions';
import reducer from './reducer';

initMiddleware(options);

const store = createStore(reducer, applyMiddleware(websocketMiddleware));
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
    message: {},
}
```
---

##### WEBSOCKET_SEND
By default, dispatches when you send a message to the WebSocket.
###### Structure
``` js
{
    type: 'WEBSOCKET_SEND',
    message: {},
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
