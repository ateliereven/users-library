import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from 'redux-thunk';
import { BrowserRouter as Router } from "react-router-dom";

import UserForm from './UserForm';
import reducer from '../../reducers';

describe('UserForm', () => {
    const onSubmit = jest.fn();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)));


    beforeEach(() => {
        onSubmit.mockClear();
        render(<Provider store={store}><Router><UserForm onSubmit={onSubmit} /></Router></Provider>)
    });

    it('OnSubmit is called when all fields pass validation', async () => {
        user.type(getTitle(), 'Mr');
        user.type(getFirstName(), 'John');
        user.type(getLastName(), 'Doe');
        user.type(getEmail(), 'john@doe.com');
        user.type(getCountry(), 'USA');
        user.type(getCity(), 'Chicago');
        user.type(getStreet(), 'Elm');
        user.type(getNumber(), '5');
        clickSubmitButton();

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
        })

        expect(onSubmit).toHaveBeenCalledWith({
            "email": "john@doe.com",
            "location": {
                "city": "Chicago",
                "country": "USA",
                "street": {
                    "name": "Elm",
                    "number": "5",
                },
            },
            "name": {
                "first": "John",
                "last": "Doe",
                "title": "Mr",
            },
        })
    });

    it('Has all fields required', async () => {
        clickSubmitButton();

        await waitFor(() => {
            expect(screen.getByText(/please enter title/i)).toBeInTheDocument();
            expect(screen.getByText(/please enter first name/i)).toBeInTheDocument();
            expect(screen.getByText(/please enter last name/i)).toBeInTheDocument();
            expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
            expect(screen.getByText(/please enter country/i)).toBeInTheDocument();
            expect(screen.getByText(/please enter city/i)).toBeInTheDocument();
            expect(screen.getAllByText(/please enter street/i)[0]).toBeInTheDocument();
            expect(screen.getByText(/please enter street number/i)).toBeInTheDocument();
        })
    });
});

function getTitle() {
    return screen.getByRole('textbox', {
        name: /title/i
    });
}
function getFirstName() {
    return screen.getByRole('textbox', {
        name: /first name/i
    });
}
function getLastName() {
    return screen.getByRole('textbox', {
        name: /last name/i
    });
}
function getEmail() {
    return screen.getByRole('textbox', {
        name: /enter email/i
    });
}
function getCountry() {
    return screen.getByRole('textbox', {
        name: /country/i
    });
}
function getCity() {
    return screen.getByRole('textbox', {
        name: /city/i
    });
}
function getStreet() {
    return screen.getByRole('textbox', {
        name: /street/i
    });
}
function getNumber() {
    return screen.getByRole('textbox', {
        name: /number/i
    });
}
function clickSubmitButton() {
    user.click(screen.getByRole('button', { name: /save/i }))
}


