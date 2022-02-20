import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';

import App from '../components/App';
import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)));

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders header', () => {
    const { container } = render(<Provider store={store}><App /></Provider>)
    const header = container.querySelector('header');
    const headerTitle = screen.getAllByText( /the users library/i )[0];
    expect(header).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
});

