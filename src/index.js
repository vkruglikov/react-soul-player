import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import playerReducer from './redux/reducer'
import VideoPlayer from './VideoPlayer'

const store = createStore(combineReducers({
    player: playerReducer
}), composeWithDevTools());

ReactDOM.render((
        <Provider store={store}>
            <VideoPlayer id={1} />
        </Provider>
    ),
    document.getElementById('root')
);
