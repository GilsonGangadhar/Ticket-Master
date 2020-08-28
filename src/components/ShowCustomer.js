
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetAllTickets } from '../actions/ticketsAction'
import {startGetAllDepartments } from '../actions/departmentsAction';

class ShowCustomer extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        this.props.dispatch(startGetAllTickets())
        this.props.dispatch(startGetAllDepartments())
    }

    render() {
        let tickete = this.props.tickets.length > 0 && this.props.tickets.find(ticket => ticket.customer == this.props.eachCustomer._id )
        let departmente = this.props.departments.length > 0 && //this.props.departments.find(department => department._id == tickete.department)
       console.log(this.props.eachCustomer, "showEachCustomer")
       console.log(this.props.tickets, "all tickets")
       console.log(this.props.departments, "all departments")
       //console.log(departmente, "required department")
       console.log(tickete, 'required ticket')
        return (
            <div>
                <h3> {this.props.eachCustomer.name } - {this.props.eachCustomer.email} </h3> 
                <p><Link to={`/editCustomer/${this.props.eachCustomer._id}`}>Edit</Link></p> <br/>

                 {(this.props.tickets.find(ticket => ticket.customer == this.props.eachCustomer._id)) && (<div>
                     <h3>Tickets - {this.props.tickets.filter(ticket => ticket.customer == this.props.eachCustomer._id).length}</h3>
                    {(tickete.isResolved)?(<div>
                        <h4>Completed</h4>
                        <p>Code No. : {tickete.code}</p>
                        <p>Customer: {this.props.eachCustomer.name} </p>
                        <p>Employees: </p>
                        <p>Department:  </p>
                        <p>Message: {tickete.message} </p>
                        <p>Priority: {tickete.priority} </p>

                    </div>) : (<div>
                        <h4>Pending</h4>
                        <p>Code No. : {tickete.code}</p>
                        <p>Customer: {this.props.eachCustomer.name} </p>
                        <p>Employees: </p>
                        <p>Department:  </p>
                        <p>Message: {tickete.message} </p>
                        <p>Priority: {tickete.priority} </p>
                    </div>) }
                 </div>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departments : state.departments,
        eachCustomer : state.eachCustomer,
        tickets : state.tickets,
         
    }
}

export default connect(mapStateToProps)(ShowCustomer)