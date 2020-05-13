import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Main from './components/MainComponent';
import './App.css';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    )
  };
}

export default App;
