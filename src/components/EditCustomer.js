import React from 'react'
import { connect } from 'react-redux'
import { startUpdateCustomer } from '../actions/customerAction'


class EditCustomer extends React.Component {
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
            return this.props.history.push('/showCustomer')
        }

        //console.log(customer, "handleSubmit")
        this.props.dispatch(startUpdateCustomer(this.props.match.params.id, customer, redirect))
    }

    render() {
        let id = this.props.match.params.id
        let customer = this.props.customers.find(customer => customer._id === id)
        console.log(this.props.customers, "customers")
        console.log(customer, "required customer")
        return(
            <div>
                <h3>Edit Customer</h3>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={this.state.name} placeholder={customer.name} onChange={this.handleChange} /> <br/><br/>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder={customer.email} /><br/><br/>
                <label htmlFor="mobile">Mobile: </label>
                <input type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} placeholder={customer.mobile} /><br/><br/>
                <input type="submit" value="submit" />


                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers : state.customers,
    }
}

export default connect(mapStateToProps)(EditCustomer)