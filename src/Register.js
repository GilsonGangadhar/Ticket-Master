import React from 'react'

import { connect } from 'react-redux'
import { startPostUsers } from './actions/registerAction'



class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username : '',
            email : '',
            password : '',
            
        }
    }

    handleUsername = (e) => {
        let username = e.target.value
        this.setState({username})
    }

   

    handleEmail = (e) => {
        let email = e.target.value
        this.setState({email})
    }

    handlePassword = (e) => {
        let password = e.target.value
        this.setState({password})
    }

    handleRegister = (e) => {
        e.preventDefault()

        const object = {
            username : this.state.username, 
            email : this.state.email, 
            password : this.state.password
        }

        console.log(object, "gokul")

        
        const redirect = () => {
            return this.props.history.push('/login')
        }
            this.props.dispatch(startPostUsers(object, redirect))
        
           
        
       
    }

    render() {
        return (
          
            <div>
               <h2>Register</h2>
                <form>
                <input type="text" value={this.state.username} onChange={this.handleUsername} placeholder="Username"  /><br/><br/>
                <input type="text" value={this.state.email} onChange={this.handleEmail} placeholder="Email" /><br/><br/>
                <input type="text" value={this.state.password} onChange={this.handlePassword} placeholder="Password" /><br/><br/>
                <button onClick={this.handleRegister}>Register</button>
                </form>
            </div>
          
        )
    }
}



export default connect()(Register)