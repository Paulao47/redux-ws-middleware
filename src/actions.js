// Websocket actions
export const createAction = (type, ...argNames) => {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
};

export const connectSocket = createAction('WEBSOCKET_CONNECT', 'event');
export const socketMessage = createAction('WEBSOCKET_MESSAGE', 'message');
export const socketError = createAction('WEBSOCKET_ERROR', 'error');
export const closeSocket = createAction('WEBSOCKET_DISCONNECT', 'event');
