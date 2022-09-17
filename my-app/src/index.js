import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//const elem = <h2>Hello World!</h2>;

const text = 'Hello World!';

const elem = (
    <div>
        <h2>Текст: {text}, {2+2}</h2>
        <input type="text" />
        <button></button>
    </div>
);

//const elem = React.createElement('h2', {className: 'greetings'}, 'Hello World!');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    elem
  //<React.StrictMode>
  //  <App />
  //</React.StrictMode>
);

reportWebVitals();
