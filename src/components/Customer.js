import React from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import { startGetAllCustomers, startDeleteCustomer, startShowCustomer } from '../actions/customerAction'



class Customer extends React.Component {
    constructor(props) {
        super(props) 
       
    }

    handleShow = (id) => {

        const redirect = () => {
            this.props.history.push('/showCustomer')
        }
        this.props.dispatch(startShowCustomer(id, redirect ))
    }

    handleRemove = (id) => {
        window.confirm('Are you sure want to delete?')
        if(window.confirm) {
        this.props.dispatch(startDeleteCustomer(id))
        }
    }

    componentDidMount() {
        this.props.dispatch(startGetAllCustomers())
    }

    render() {
        console.log(this.props.customers, "gilson")
        const {customers} = this.props
        return (
            <div>
                    <h2>Customers - {customers.length}</h2>
            <table border="1">
                    <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Action</th>
                                <th>Remove</th>
                            </tr>
                    </thead>
                    {
                        (customers.length > 0) && (
                    <tbody>
                           {
                               customers.map((ele, i) => {
                                return(
                                   <tr key={i}>
                                       <td>{i + 1}</td>
                                       <td>{ele.name}</td>
                                       <td>{ele.email}</td>
                                       <td>{ele.mobile}</td>
                                       <td><button onClick={() => {
                                           this.handleShow(ele._id)
                                       }}>Show</button></td>
                                       <td><button onClick={() => {
                                           this.handleRemove(ele._id)
                                       }}>Remove</button></td>
                                   </tr>
                                )
                               })
                           }
                    </tbody>
                    )
                    }
                   
            </table> <br/>
            <Link to="/addCustomer">Add customer</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers : state.customers
    }
}

export default connect(mapStateToProps)(Customer)