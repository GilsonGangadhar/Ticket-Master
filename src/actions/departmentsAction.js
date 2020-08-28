import  axios  from 'axios'

export const setDepartments = (array) => {
    return {type : 'SET_DEPARTMENTS', payload : array}
}

export const setEachDepartment = (object) => {
    return {type : 'SET_EACH_DEPARTMENT', payload : object}
}

export const startGetAllDepartments = () => {
    return(dispatch) => {
        axios.get('http://dct-ticket-master.herokuapp.com/departments', {headers:{
            'x-auth' : localStorage.getItem('authToken')
        }})

        .then((response) => {
            console.log(response.data, "departments")

           let allDepartments = response.data
           dispatch(setDepartments(allDepartments))
        
        })
    }
}

export const startPostDepartment = (department) => {
    return(dispatch) => {
        axios.post('http://dct-ticket-master.herokuapp.com/departments', department, {headers:{
            'x-auth' : localStorage.getItem('authToken')
        }})

        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
                alert(response.data.message, response.data._message)
            } else {
                console.log(response.data, "post department")
                dispatch(startGetAllDepartments())
            }
        })
    }
}

export const startShowDepartment = (id, redirect) => {
    return(dispatch) => {
        axios.get(`http://dct-ticket-master.herokuapp.com/departments/${id}`, {headers : {
            'x-auth' : localStorage.getItem('authToken')
        }})

        .then((response) => {
            console.log(response.data, "show department")

            if(Object.keys(response.data).length == 0){
                alert("error")
            } else {
                let eachDepartment = response.data
                dispatch(setEachDepartment(eachDepartment))
                redirect()
            }
        })
    }
}

export const startDepartmentUpdate = (id, object, redirect) => {
    return(dispatch) => {
        axios.put(`http://dct-ticket-master.herokuapp.com/departments/${id}`, object, {headers: {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
                alert(response.data.message)
            } else {
                console.log(response.data, "edit department")
                dispatch(startShowDepartment(id, redirect))
                //redirect()
            }
        })
    }
}

export const startDeleteDepartment = (id) => {
    return(dispatch) => {
        axios.delete(`http://dct-ticket-master.herokuapp.com/departments/${id}`, {headers: {
            'x-auth' : localStorage.getItem('authToken')
        }})
        .then((response) => {
            if(Object.keys(response.data).length == 0){
                alert('error')
            }
            dispatch(startGetAllDepartments())
        })
    }
}