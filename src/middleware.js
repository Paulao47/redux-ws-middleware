import { connectSocket, socketMessage, socketError } from './actions';

// Default Middleware Functions
const onOpenEvent = () => {};

const onMessageEvent = (event, socket, store) => {
  store.dispatch(socketMessage(event));
};

const onErrorEvent = (error, socket, store) => {
  store.dispatch(socketError(error));
};

const onCloseEvent = () => {};

const onMiddlewareConnectEvent = action => {
  const data = action.event || {};
  const timestamp = new Date().getTime();

  action.event = { data, timestamp, type: 'CONNECT' };
};

const onMiddlewareMessageEvent = action => {
  const data = action.message.data || {};
  const timestamp = new Date().getTime();

  action.message = { data, timestamp, type: 'MESSAGE' };
};

const onMessageSendEvent = (action, socket) => {
  const message = action.message || '';
  const timestamp = new Date().getTime();

  const msg = { Message: message };

  action.message = { data: message, timestamp, type: 'SEND' };

  socket.send(JSON.stringify(msg));
};

const onMiddlewareErrorEvent = action => {
  const data = action.error || {};
  const timestamp = new Date().getTime();

  action.error = { data, timestamp, type: 'ERROR' };
};

const onMiddlewareCloseEvent = (action, socket) => {
  socket.close();

  const data = action.event || {};
  const timestamp = new Date().getTime();

  action.event = { data, timestamp, type: 'DISCONNECT' };
};

// Default Middleware Config
export const middlewareConfig = {
  config: {
    url: '',
    protocols: [],
    onOpen: onOpenEvent,
    onMessage: onMessageEvent,
    onError: onErrorEvent,
    onClose: onCloseEvent,
    onMiddlewareConnect: onMiddlewareConnectEvent,
    onMiddlewareMessage: onMiddlewareMessageEvent,
    onMessageSend: onMessageSendEvent,
    onMiddlewareError: onMiddlewareErrorEvent,
    onMiddlewareClose: onMiddlewareCloseEvent,
    reconnect: false,
    reconnectInterval: 0,
    limit: null,
    keyName: 'events'
  }
};

export const initMiddleware = config => {
  const initialConfig = middlewareConfig.config;

  middlewareConfig.config = { ...initialConfig, ...config };
};

// Websocket Middleware
const websocketMiddleware = () => {
  let socket = null;

  return store => next => action => {
    const { dispatch } = store;

    const {
      url,
      protocols,
      onOpen,
      onMessage,
      onError,
      onClose,
      onMiddlewareConnect,
      onMiddlewareMessage,
      onMessageSend,
      onMiddlewareError,
      onMiddlewareClose,
      reconnect,
      reconnectInterval
    } = middlewareConfig.config;

    // Socket initialization and event listeners
    const startSocket = () => {
      socket = new WebSocket(url, protocols);

      socket.onopen = event => {
        onOpen(event, socket, store);
      };

      socket.onmessage = event => {
        onMessage(event, socket, store);
      };

      socket.onerror = error => {
        onError(error, socket, store);
      };

      socket.onclose = event => {
        onClose(event, socket, store);

        if (reconnect) {
          setTimeout(() => dispatch(connectSocket()), reconnectInterval);
        }
      };
    };

    switch (action.type) {
      case 'WEBSOCKET_CONNECT': {
        startSocket();

        onMiddlewareConnect(action, socket, store);

        return next(action);
      }
      case 'WEBSOCKET_MESSAGE': {
        onMiddlewareMessage(action, socket, store);

        return next(action);
      }
      case 'WEBSOCKET_SEND': {
        onMessageSend(action, socket, store);

        return next(action);
      }
      case 'WEBSOCKET_ERROR': {
        onMiddlewareError(action, socket, store);

        return next(action);
      }
      case 'WEBSOCKET_DISCONNECT': {
        onMiddlewareClose(action, socket, store);

        return next(action);
      }
      default: {
        return next(action);
      }
    }
  };
};

export default websocketMiddleware();
