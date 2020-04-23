// Websocket reducer
const WebsocketReducerDefaultState = {
  events: []
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
      return {
        events: [action.event, ...state.events]
      };
    },
    [WEBSOCKET_MESSAGE]: (state, action) => {
      return {
        events: [action.message, ...state.events]
      };
    },
    [WEBSOCKET_SEND]: (state, action) => {
      return {
        events: [action.message, ...state.events]
      };
    },
    [WEBSOCKET_ERROR]: (state, action) => {
      return {
        events: [action.error, ...state.events]
      };
    },
    [WEBSOCKET_DISCONNECT]: (state, action) => {
      return {
        events: [action.event, ...state.events]
      };
    }
  }
);
