import axios from 'axios'

export const setUser = (user) => {
    return {type: 'SET_USER', payload: user}
}


export const startPostLogin = (formData, redirect) => {
    return(dispatch) => {
        axios.post(`http://dct-ticket-master.herokuapp.com/users/login`, formData)
        .then((response) => {
            if(response.data.hasOwnProperty('error')) {
                alert(response.data.error)
            } else {
                alert('successfully logged in')
                localStorage.setItem('authToken', response.data.token)
                axios.get(`http://dct-ticket-master.herokuapp.com/users/account`,{headers:{
                    'x-auth' : localStorage.getItem('authToken')
                }
                })
                .then((response) => {
                    const user = response.data
                    dispatch(setUser(user))
                    redirect()
                })
                .catch((err) => {
                    alert(err)
                })
               
            }
        })

        .catch((err) => {
            console.log(err)
        })
    }
}

export const startGetUser = () => {
    return(dispatch) => { 

                axios.get(`http://dct-ticket-master.herokuapp.com/users/account`,{headers:{
                    'x-auth' : localStorage.getItem('authToken')
                }
                })
                .then((response) => {
                    const user = response.data
                    dispatch(setUser(user))
                    
                })
                .catch((err) => {
                    alert(err)
                })
     
    }
}

export const startPostUsers = (object, redirect) => {
    return(dispatch) => {
        axios.post('http://dct-ticket-master.herokuapp.com/users/register' , object)
        .then((response) => {
            console.log(response.data, "gokul")
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                alert ('you has successfully registered')
                redirect()
            }
        })

        .catch((err) => {
            console.log(err)
        })
    }
}

export const startUserLogout = () => {
    return(dispatch) => {
        axios.delete('http://dct-ticket-master.herokuapp.com/users/logout', {
            headers: {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

        .then((response) => {
            if(response.data.notice) {
                alert(response.data.notice)
                localStorage.removeItem('authToken')
                dispatch(setUser({}))
                window.location.href = "/"
            }
        })
    }
}