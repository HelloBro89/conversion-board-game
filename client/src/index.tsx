import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router /* Route, */ /* Routes */ /* HashRouter */,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import store from './components/services/store/store';
import { NotFound } from './components/pages/Errors/NotFound';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                {/* <Routes>
                    <Route>
                        <Route path="/*" element={<App />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Route>
                </Routes> */}
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
