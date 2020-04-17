// Websocket actions
export const connectSocket = (event = {}) => ({
  type: 'WEBSOCKET_CONNECT',
  event
});

export const socketMessage = (message = {}) => ({
  type: 'WEBSOCKET_MESSAGE',
  message
});

export const socketError = (error = {}) => ({
  type: 'WEBSOCKET_ERROR',
  error
});

export const closeSocket = (event = {}) => ({
  type: 'WEBSOCKET_DISCONNECT',
  event
});
