import { middlewareConfig } from './middleware';
const { keyName, limit } = middlewareConfig.config;

// Websocket reducer
const WebsocketReducerDefaultState = {
  [keyName]: []
};

export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';
const WEBSOCKET_SEND = 'WEBSOCKET_SEND';
const WEBSOCKET_ERROR = 'WEBSOCKET_ERROR';
const WEBSOCKET_DISCONNECT = 'WEBSOCKET_DISCONNECT';

export const websocketEventsReducer = createReducer(
  WebsocketReducerDefaultState,
  {
    [WEBSOCKET_CONNECT]: (state, action) => {
      const { event } = action;

      if (event) {
        const stateValue = state[keyName];
        const newValue =
          limit || limit === 0 ? stateValue.slice(0, limit) : stateValue;

        return {
          [keyName]: [event, ...newValue]
        };
      }
      return { ...state };
    },
    [WEBSOCKET_MESSAGE]: (state, action) => {
      const { message } = action;

      if (message) {
        const stateValue = state[keyName];
        const newValue =
          limit || limit === 0 ? stateValue.slice(0, limit) : stateValue;

        return {
          [keyName]: [message, ...newValue]
        };
      }
      return { ...state };
    },
    [WEBSOCKET_SEND]: (state, action) => {
      const { message } = action;

      if (message) {
        const stateValue = state[keyName];
        const newValue =
          limit || limit === 0 ? stateValue.slice(0, limit) : stateValue;

        return {
          [keyName]: [message, ...newValue]
        };
      }
      return { ...state };
    },
    [WEBSOCKET_ERROR]: (state, action) => {
      const { error } = action;

      if (error) {
        const stateValue = state[keyName];
        const newValue =
          limit || limit === 0 ? stateValue.slice(0, limit) : stateValue;

        return {
          [keyName]: [error, ...newValue]
        };
      }
      return { ...state };
    },
    [WEBSOCKET_DISCONNECT]: (state, action) => {
      const { event } = action;

      if (event) {
        const stateValue = state[keyName];
        const newValue =
          limit || limit === 0 ? stateValue.slice(0, limit) : stateValue;

        return {
          [keyName]: [event, ...newValue]
        };
      }
      return { ...state };
    }
  }
);
