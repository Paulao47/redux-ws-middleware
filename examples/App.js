import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from 'reactstrap';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/scss/bootstrap.scss';

import {
  websocketMiddleware,
  websocketEventsReducer,
  initMiddleware,
  connectSocket,
  closeSocket
} from '../src/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  websocketEventsReducer,
  composeEnhancers(applyMiddleware(websocketMiddleware))
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;

    this.setState({ url: value });
  }

  handleConnect() {
    const { url } = this.state;

    initMiddleware({ url });
    store.dispatch(connectSocket());
  }

  render() {
    return (
      <div>
        <Provider store={store}>
          <Card>
            <CardHeader>
              <span className="btn btn-outline-light active btn-no-click">
                <b> Redux Websocket Middleware</b>
              </span>
            </CardHeader>
            <CardBody>
              <InputGroup>
                <Input
                  type="text"
                  name="url"
                  placeholder="Enter URL"
                  value={this.state.url}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="success" onClick={this.handleConnect}>
                    Connect
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => store.dispatch(closeSocket())}
                  >
                    Disconnect
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </CardBody>
          </Card>
        </Provider>
      </div>
    );
  }
}

export default App;
