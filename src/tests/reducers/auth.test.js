import React from 'react';
import authReducer from '../../reducers/auth'

test('Should clear uid for logout', () => {
    const action = { type:'LOGOUT' };
    const state = authReducer({uid:'anything'},action);
    expect(state).toEqual({})
});

test('Should setup uid for login', () => {
    const uid = {uid:'123abc'};
    const action = {type: 'LOGIN', uid};
    const state = authReducer({}, action);
    expect(state.uid).toEqual(action.uid)
});