import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import ThemeWrapper from './components/ThemeWrapper';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeWrapper>
        <AppRoutes />
      </ThemeWrapper>
    </BrowserRouter>
  </Provider>
);
