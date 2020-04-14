import React from 'react';
import { login, logout} from "../../actions/auth";

test('Should set up login action object', () => {
    const action = login('123abc');
    expect(action).toEqual({
        type: 'LOGIN',
        uid:'123abc'
    })
});

test('Should set up logout action object', () => {
    const action = logout();
    expect(action).toEqual({ type:'LOGOUT'})
});