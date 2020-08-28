import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './App'
import { startGetUser } from './actions/registerAction'

const store = configureStore()
console.log(store.getState())

store.subscribe(() => {
    console.log(store.getState())
})

//handle page reload

if(localStorage.getItem('authToken')) {
    store.dispatch(startGetUser())
}

const ele = (
    <Provider store={store}>
        <App/>
    </Provider>
)


ReactDOM.render(ele, document.getElementById('root'))