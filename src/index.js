import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import {ROOT_REDUCER} from "./redux/constants";
import playerReducer from './redux/reducer'

import VideoPlayer from './VideoPlayer'
import TextSaver from "./effects/TextSaver";
import AbstractEffect from "./containers/AbstractEffect";

const store = createStore(combineReducers({
    [ROOT_REDUCER]: playerReducer
}), composeWithDevTools());

ReactDOM.render((
        <Provider store={store}>
            <VideoPlayer id={1}>
                <AbstractEffect
                    timeStart={3}
                    timeEnd={7}
                >
                    <TextSaver title={'Дорога в ад'}>Много людей хотели это сделать, но не смогли</TextSaver>
                </AbstractEffect>
            </VideoPlayer>
        </Provider>
    ),
    document.getElementById('root')
);
