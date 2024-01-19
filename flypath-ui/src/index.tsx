import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.scss'

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Provider } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { setUpInterceptors } from '@rest-services/axios/axios-interceptors'
import persistStore from 'redux-persist/es/persistStore'
import { StoreRootReducer } from '@store/root-reducer'
import { StoreActions } from '@types-internal/store/root-store.type'
import { store } from '@store/root-store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './components/App/App'
import reportWebVitals from './reportWebVitals'

const persistor = persistStore<StoreRootReducer, StoreActions>(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

setUpInterceptors(store)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
