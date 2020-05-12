import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Main from './components/MainComponent';
import './App.css';


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    )
  };
}

export default App;
