import React from 'react'
import { connect } from 'react-redux'
import { startPostLogin } from './actions/registerAction'


class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email : '',
            password : '',
            status : false,
            redirect : null
        }
    }

        handleEmail = (e) => {
            let email = e.target.value
            this.setState({email})
        }

        handlePassword = (e) => {
            let password = e.target.value
            this.setState({password})
        }

        handleLogin = (e) => {
            e.preventDefault()
            let formData = {
                email : this.state.email,
                password : this.state.password
            }

            const redirect = () => {
                return this.props.history.push('/')
            }

            this.props.dispatch(startPostLogin(formData, redirect))
            
        }

        render() {
            return (
                
                <div>
                    <h2>Login</h2>
                    <form>
                        <input type="text" value={this.state.email} onChange={this.handleEmail} placeholder="Email" /><br/><br/>
                        <input type="text" value={this.state.password} onChange={this.handlePassword} placeholder="Password" /><br/><br/>
                        <button onClick={this.handleLogin}>Login</button>
                    </form>

                </div>
                
            )
            }
    }
     
    


export default connect()(Login)