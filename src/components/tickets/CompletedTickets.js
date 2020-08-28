import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetAllTickets, startDeleteTicket, startShowTicket } from '../../actions/ticketsAction'
import { startGetAllCustomers } from '../../actions/customerAction'
import { startGetAllDepartments } from '../../actions/departmentsAction'
import { startGetAllEmployees } from '../../actions/employeesAction'
import { startPutTicket } from '../../actions/ticketsAction'

class TicketsCompleted extends React.Component {

handleShow = (id) => {
    const redirect = () => {
        this.props.history.push('/showTicket')
    }
    this.props.dispatch(startShowTicket(id, redirect))
}

handleCheck = (id) => {
    const ticket = this.props.tickets.find(ticket => ticket._id == id)

    const data = {
        isResolved : !ticket.isResolved
    }
    this.props.dispatch(startPutTicket(id, data))
}

handleRemove = (id) => {
window.confirm("Are you sure you want to delete?")

if(window.confirm){
    this.props.dispatch(startDeleteTicket(id))
}
}

componentDidMount() {
    this.props.dispatch(startGetAllCustomers())
    this.props.dispatch(startGetAllDepartments())
    this.props.dispatch(startGetAllEmployees())
    this.props.dispatch(startGetAllTickets())


}

    render() {
        console.log(this.props.ticketsCompleted, "all tickets array")
        //console.log(this.props.departments, "all departments")
        console.log(this.props.employees, "all employees")
        //console.log(this.props.customers, "all customers")
        return (
            <div>
                <h2>Tickets -{this.props.ticketsCompleted.length} </h2>
                <Link to="/tickets">Pending</Link>||<Link>Completed</Link> <br/><br/>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Customer</th>
                            <th>Department</th>
                            <th>Employees</th>
                            <th>Message</th>
                            <th>Priority</th>
                            <th>Actions</th>
                            <th>Remove</th>
                            <th>Not Complete</th>      
                        </tr>
                    </thead>
                    {
                        (this.props.ticketsCompleted.length > 0) && (
                            <tbody>
                                {
                                    this.props.ticketsCompleted.map((ele,i) => {
                                        return(
                                            <tr key={i}>

                                            <td>{ele.code}</td>
                                            <td>{this.props.customers.find(custom=>custom._id==ele.customer).name}</td>
                                            <td>{this.props.departments.find(department=>department._id==ele.department).name}</td>
                                            <td>{ele.employees[0]._id} {/*{this.props.employees.find(employee => employee._id == ele.employees[0]._id).name}*/}</td>
                                            <td>{ele.message}</td>
                                            <td>{ele.priority}</td>
                                            <td><button onClick={() => {
                                                this.handleShow(ele._id)
                                            }}>Show</button></td>
                                            <td><button onClick={() => {
                                                this.handleRemove(ele._id)
                                            }}>Remove</button></td>
                                            <td><input type="checkbox" defaultChecked={ele.isResolved} onChange={() => {this.handleCheck(ele._id)}} /></td>

                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        )
                    }
                </table><br/><br/>
                <Link to="/addTicket">Add Ticket</Link><br/><br/>
                <progress id="" value={this.props.ticketsCompleted.length} max={this.props.tickets.length} >{this.props.ticketsCompleted.length}</progress>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tickets : state.tickets,
        customers : state.customers,
        departments : state.departments,
        employees : state.employees,
        ticketsCompleted : state.tickets.filter(ticket => ticket.isResolved == true)
    }
}

export default connect(mapStateToProps)(TicketsCompleted)