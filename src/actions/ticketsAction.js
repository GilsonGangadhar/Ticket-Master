import axios from "axios"

export const setTickets = (array) => {
    return {type : 'SET_TICKETS', payload : array}
}

export const setEachTicket = (object) => {
    return {type : 'SET_EACH_TICKET', payload : object}
}

export const startGetAllTickets = () => {
    return(dispatch) => {
        axios.get('http://dct-ticket-master.herokuapp.com/tickets',{headers : {
            'x-auth' : localStorage.getItem('authToken')
        }})

        .then((response) => {
            console.log(response.data, "All Tickets axios")

            let allTickets = response.data
            dispatch(setTickets(allTickets))
        })
    }
}

export const startPostTicket = (object,redirect) => {
    return(dispatch) => {
        axios.post(`http://dct-ticket-master.herokuapp.com/tickets`, object, {headers : {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
                alert(response.data.message)
            }else {
                console.log(response.data, "post ticket")
                dispatch(startGetAllTickets())
                redirect()
            }
        })
    }
}

export const startShowTicket = (id, redirect) => {
    return(dispatch) => {
        axios.get(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, {headers : {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            console.log(response.data, "showEachTicket")
            
            if(Object.keys(response.data).length == 0) {
                alert("error")
            } else {
                let eachTicket = response.data
                dispatch(setEachTicket(eachTicket))
                redirect()
            }
        })
    }
}

export const startTicketUpdate = (id, object, redirect) => {
    return(dispatch) => {
        axios.put(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, object, {headers : {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
                alert(response.data.message)
            } else {
                console.log(response.data, "edit employee")
                dispatch(startShowTicket(id, redirect))
            }
        })
    }
}

export const startPutTicket = (id, data) => {
    return(dispatch) => {
        axios.put(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, data, {headers : {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
                alert(response.data.message)
            } else {
                console.log(response.data, "after clicking complete/not complete")
                dispatch(startGetAllTickets())

            }
        })
    }
}

export const startDeleteTicket = (id) => {
    return(dispatch) => {
        axios.delete(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, {headers : {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            if(Object.keys(response.data).length == 0) {
                alert('error')
            }
            dispatch(startGetAllTickets())
        })
    }
}

