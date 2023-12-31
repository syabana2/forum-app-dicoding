import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react';
import App from './App.jsx';
import store from './states';

import './styles/style.css';

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <StrictMode>
            <App />
          </StrictMode>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>,
);
