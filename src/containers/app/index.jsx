import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './bootstrap-reboot.css';
import './bootstrap-grid.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <FormattedMessage
              id="App.PlaceholderTitle"
              defaultMessage="Welcome"
              description="App placeholder title"
            />
          </h1>
        </header>
        <p className="App-intro">
            <FormattedMessage
              id="App.PlaceholderDescription"
              defaultMessage="Placeholder"
              description="App placeholder description"
            />
        </p>
      </div>
    );
  }
}

export default App;
