// Websocket reducer
const WebsocketReducerDefaultState = {
  events: []
};

export default (state = WebsocketReducerDefaultState, action) => {
  switch (action.type) {
    case 'WEBSOCKET_CONNECT': {
      return {
        events: [action.event, ...state.events]
      };
    }
    case 'WEBSOCKET_MESSAGE': {
      return {
        events: [action.message, ...state.events]
      };
    }
    case 'WEBSOCKET_ERROR': {
      return {
        events: [action.error, ...state.events]
      };
    }
    case 'WEBSOCKET_DISCONNECT': {
      return {
        events: [action.event, ...state.events]
      };
    }
    default: {
      return state;
    }
  }
};
