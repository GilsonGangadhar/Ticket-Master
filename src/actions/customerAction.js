import axios from 'axios'


export const setCustomers = (array) => {
    return { type: 'SET_CUSTOMERS', payload : array}
}

export const setEachCustomer = (object) => {
    return { type : 'SET_EACH_CUSTOMER', payload : object}
}


export const startGetAllCustomers = () => {
    return(dispatch) => {
    axios.get('http://dct-ticket-master.herokuapp.com/customers', {headers:{
        'x-auth' : localStorage.getItem('authToken')
    }})
    .then((response) => {
        console.log(response.data, "jerry")

        let customerArray = response.data
        dispatch(setCustomers(customerArray))
    })
    }
}

export const startPostCustomer = (customer, redirect) => {
    return(dispatch) => {
        axios.post('http://dct-ticket-master.herokuapp.com/customers', customer, {headers:{
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
                alert(response.data.message, response.data._massage)
            } else {
                console.log(response.data, "customer post")
                redirect()
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const startShowCustomer = (id, redirect) => {
    return(dispatch) => {
        axios.get(`http://dct-ticket-master.herokuapp.com/customers/${id}`, {headers: {
            'x-auth': localStorage.getItem('authToken')
        }})
        .then((response) => {
            if(Object.keys(response.data).length == 0) {
                alert('error')
            }else {
                const eachCustomer = response.data
                console.log(eachCustomer, "showEachCustomer, customerACtion")
                dispatch(setEachCustomer(eachCustomer))
                redirect()
            }
           
        })
    }
}

export const startUpdateCustomer = (id, customer, redirect) => {
    return(dispatch) => {
        axios.put(`http://dct-ticket-master.herokuapp.com/customers/${id}`, customer, {headers : {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
                alert(response.data.message)
            } else {
                console.log(response.data, "edit customer")
                dispatch(startShowCustomer(id, redirect))
            }
        })
    }
}

export const startDeleteCustomer = (id) => {
    return(dispatch) => {
        axios.delete(`http://dct-ticket-master.herokuapp.com/customers/${id}`, {headers: {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            if(Object.keys(response.data).length == 0) {
                alert('error')
            } 
            dispatch(startGetAllCustomers())
        })
    }
}

