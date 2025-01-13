/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/redux/store.ts';
import { initHistory } from './store/ExtraFunctions/History.ts';

const root = createRoot(document.getElementById('root')!)
  root.render(
      <StrictMode>
        <Provider store={store}>
          <App history={initHistory(store)}/>
        </Provider>
      </StrictMode>,
  )
