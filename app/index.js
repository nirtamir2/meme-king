import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reducers from './reducers';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

const store = createStore(
    reducers,
    applyMiddleware(thunk, apiMiddleware),
);

// components
import App from './components/App/App';

// styles
import './style/style.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.querySelector('.root'));

export default store;