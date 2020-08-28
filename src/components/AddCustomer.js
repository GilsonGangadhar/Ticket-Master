import React from 'react'
import { connect } from 'react-redux'
import { startPostCustomer } from '../actions/customerAction'


class AddCustomer extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '', 
            mobile: ''
        }
    }

    handleChange = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const customer = {
            name : this.state.name,
            email : this.state.email, 
            mobile: this.state.mobile 
        }

        const redirect = () => {
            return this.props.history.push('/customer')
        }

        //console.log(customer, "handleSubmit")
        this.props.dispatch(startPostCustomer(customer, redirect))
    }

    render() {
        return(
            <div>
                <h3>Add Customer</h3>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} /> <br/><br/>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} /><br/><br/>
                <label htmlFor="mobile">Mobile: </label>
                <input type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} /><br/><br/>
                <input type="submit" value="submit" />


                </form>
            </div>
        )
    }
}

export default connect()(AddCustomer)