import axios from "axios";

export const setEmployees = (array) => {
    return {type : 'SET_EMPLOYEES', payload : array}
}

export const setEachEmployee = (object) => {
    return {type : 'SET_EACH_EMPLOYEE', payload : object}
}

export const startGetAllEmployees = () => {
    return(dispatch)=> {
        axios.get('http://dct-ticket-master.herokuapp.com/employees', {headers : {
            'x-auth' : localStorage.getItem( 'authToken')}})

            .then((response) => {
                console.log(response.data, "All Employees")

                let allEmployees = response.data
                dispatch(setEmployees(allEmployees))
            })
    }
}

export const startPostEmployee = (object, redirect) => {
    return(dispatch) => {
        axios.post('http://dct-ticket-master.herokuapp.com/employees', object, {headers : {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
           if(response.data.hasOwnProperty('errors')){
               console.log(response.data.errors)
               alert(response.data.message)
           } else {
               console.log(response.data, "post employee")
               dispatch(startGetAllEmployees())
               redirect()
           }
        })
    }
}

export const startShowEmployee = (id, redirect) => {
    return(dispatch) => {
        axios.get(`http://dct-ticket-master.herokuapp.com/employees/${id}`, {headers: {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            console.log(response.data, "Show Each Employee")

            if(Object.keys(response.data).length == 0) {
                alert("error")
            } else {
                let eachEmployee = response.data
                dispatch(setEachEmployee(eachEmployee))
                redirect()
            }
        })
    }
}

export const startEmployeeUpdate = (id, object, redirect) => {
    return(dispatch) => {
        axios.put(`http://dct-ticket-master.herokuapp.com/employees/${id}`, object, {headers : {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response)=> {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
                alert(response.data.message)
            } else {
                console.log(response.data, "edit employee")
                dispatch(startShowEmployee(id, redirect))
            }
        })
    }
}

export const startDeleteEmployee = (id) => {
    return(dispatch) => {
        axios.delete(`http://dct-ticket-master.herokuapp.com/employees/${id}`, {headers : {
          'x-auth' : localStorage.getItem('authToken')  
        }})
        .then((response) => {
            if(Object.keys(response.data).length == 0) {
                alert('error')
            }
           dispatch(startGetAllEmployees())
        })
    }
}